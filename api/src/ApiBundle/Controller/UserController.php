<?php

namespace ApiBundle\Controller;

use ApiBundle\Entity\User;
use ApiBundle\Form\Type\UserEditType;
use ApiBundle\Form\Type\RegisterType;
use FOS\RestBundle\View\View;
use FOS\RestBundle\Controller\Annotations;
use FOS\RestBundle\View\RouteRedirectView;
use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Routing\ClassResourceInterface;
use FOS\RestBundle\Controller\Annotations\RouteResource;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Form\FormTypeInterface;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

/**
 * Class UserController
 * @package AppBundle\Controller
 *
 * @RouteResource("User")
 */
class UserController extends FOSRestController implements ClassResourceInterface
{

    private function getUserRepository()
    {
        return $this->get('crv.doctrine_entity_repository.user');
    }

    private function getUserId()
    {
        return $this->getUser()->getId();
    }

    public function getAction()
    {
        $user = $this->getUserRepository()
            ->createFindOneByIdQuery($this->getUserId())
            ->getOneOrNullResult();

        if($user == null) {
            return new View(null, Response::HTTP_NOT_FOUND);
        }
        return $user;
    }

    public function postCheckUsernameAction(Request $request)
    {
        $username = $request->request->get('username', '');

        $user = $this->getUserRepository()
            ->createFindByUsernameQuery($username)
            ->getResult();

        $available = ['available' => false];

        if($user == null) {
            $available = ['available' => true];
        }

        return $available;
    }

    public function postAction(Request $request)
    {
        $dateTime = new \DateTime('now');
        $user = new User();

        $form = $this->createForm(registerType::class, $user, [
            'csrf_protection' => false,
            'allow_extra_fields' => true
        ]);

        $form->submit($request->request->all());

        if (!$form->isValid()) {
            return $form;
        }

        $plainPassword = $user->getPassword();
        $encoder = $this->container->get('security.password_encoder');
        $encoded = $encoder->encodePassword($user, $plainPassword);

        $user->setPassword($encoded);
        $user->setCreatedAt($dateTime);
        $user->setUpdatedAt($dateTime);

        $em = $this->getDoctrine()->getManager();
        $em->persist($user);
        $em->flush();

        $routeOptions = [
            'id' => $user->getId(),
        ];

        return $this->routeRedirectView('get_user', $routeOptions, Response::HTTP_CREATED);
    }
    
    public function putAction(Request $request)
    {
        $dateTime = new \DateTime('now');
        $user = $this->getUserRepository()
            ->createUpdateQuery($this->getUserId())
            ->getOneOrNullResult();

        if ($user == null) {
            return new View(null, Response::HTTP_NOT_FOUND);
        }

        $user->setUpdatedAt($dateTime);

        $form = $this->createForm(UserEditType::class, $user, [
            'csrf_protection' => false,
            'allow_extra_fields' => true
        ]);

        $form->submit($request->request->all());

        if (!$form->isValid()) {
            return $form;
        }

        $em = $this->getDoctrine()->getManager();
        $em->flush();

        $routeOptions = [
            'id' => $user->getId(),
        ];

        return $this->routeRedirectView('get_user', $routeOptions, Response::HTTP_NO_CONTENT);
    }

    public function patchAction(Request $request)
    {
        $dateTime = new \DateTime('now');
        $user = $this->getUserRepository()
            ->createUpdateQuery($this->getUserId())
            ->getOneOrNullResult();

        if ($user == null) {
            return new View(null, Response::HTTP_NOT_FOUND);
        }

        $user->setUpdatedAt($dateTime);

        $form = $this->createForm(UserEditType::class, $user, [
            'csrf_protection' => false,
            'allow_extra_fields' => true
        ]);

        $form->submit($request->request->all(), false);

        if (!$form->isValid()) {
            return $form;
        }

        $em = $this->getDoctrine()->getManager();
        $em->flush();

        $routeOptions = [
            'id' => $user->getId(),
        ];

        return $this->routeRedirectView('get_user', $routeOptions, Response::HTTP_NO_CONTENT);
    }

   /* public function deleteAction(Request $request)
    {
        $user = $this->getUserRepository()
            ->createUpdateQuery($this->getUserId())
            ->getOneOrNullResult();

        if ($user == null) {
            return new View(null, Response::HTTP_NOT_FOUND);
        }

        $encoder = $this->get('security.password_encoder');
        $encoded = $encoder->encodePassword($request->request->get('password'));
        
        $userPassword = $user->getPassword();

        $isValid = $this->getPasswordEncoder()->isPasswordValid($userPassword, $password, null);

        if (!$isValid) {
            return new View(null, Response::HTTP_CONFLICT);
        }

        $em = $this->getDoctrine()->getManager();
        $em->remove($user);
        $em->flush();

        return new View(null, Response::HTTP_NO_CONTENT);
    }*/

}