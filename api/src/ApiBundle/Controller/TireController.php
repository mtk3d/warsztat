<?php

namespace ApiBundle\Controller;

use ApiBundle\Entity\Tire;
use ApiBundle\Form\Type\TireType;
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
 * Class TireController
 * @package AppBundle\Controller
 *
 * @RouteResource("Tire")
 */
class TireController extends FOSRestController implements ClassResourceInterface
{
    
    private function getTireRepository()
    {
        return $this->get('crv.doctrine_entity_repository.tire');
    }

    private function getUserId()
    {
        return $this->getUser()->getId();
    }

    public function cgetAction()
    {
        $tires = $this->getTireRepository()
            ->createFindAllQuery($this->getUserId())
            ->getResult();

        if($tires == null) {
            return new View(null, Response::HTTP_NOT_FOUND);
        }
        return $tires;
    }

    public function getConsumerAction(int $consumerId)
    {
        $tire = $this->getTireRepository()
            ->createFindByConsumerIdQuery($consumerId, $this->getUserId())
            ->getResult();

        if ($tire == null) {
            return new View(null, Response::HTTP_NOT_FOUND);
        }
        return $tire;
    }

    public function getAction(int $id)
    {
        $tire = $this->getTireRepository()
            ->createFindOneByIdQuery($id, $this->getUserId())
            ->getOneOrNullResult();

        if($tire == null) {
            return new View(null, Response::HTTP_NOT_FOUND);
        }
        return $tire;
    }

    public function postAction(Request $request)
    {
        $dateTime = new \DateTime('now');
        $tire = new Tire();

        $form = $this->createForm(tireType::class, $tire, [
            'csrf_protection' => false,
            'allow_extra_fields' => true
        ]);

        $form->submit($request->request->all());

        if (!$form->isValid()) {
            return $form;
        }

        $tire->setUserId($this->getUserId());
        $tire->setCreatedAt($dateTime);
        $tire->setUpdatedAt($dateTime);

        $em = $this->getDoctrine()->getManager();
        $em->persist($tire);
        $em->flush();

        $routeOptions = [
            'id' => $tire->getId(),
        ];

        return $this->routeRedirectView('get_tire', $routeOptions, Response::HTTP_CREATED);
    }

    public function putAction(Request $request, int $id)
    {
        $dateTime = new \DateTime('now');
        $tire = $this->getTireRepository()
            ->createFindOneByIdQuery($id, $this->getUserId())
            ->getOneOrNullResult();

        if ($tire == null) {
            return new View(null, Response::HTTP_NOT_FOUND);
        }

        $ire->setUpdatedAt($dateTime);

        $form = $this->createForm(tireType::class, $tire, [
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
            'id' => $tire->getId(),
        ];

        return $this->routeRedirectView('get_tire', $routeOptions, Response::HTTP_NO_CONTENT);
    }

    public function patchAction(Request $request, int $id)
    {
        $dateTime = new \DateTime('now');
        $tire = $this->getTireRepository()
            ->createFindOneByIdQuery($id, $this->getUserId())
            ->getOneOrNullResult();

        if ($tire == null) {
            return new View(null, Response::HTTP_NOT_FOUND);
        }

        $tire->setUpdatedAt($dateTime);

        $form = $this->createForm(tireType::class, $tire, [
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
            'id' => $tire->getId(),
        ];

        return $this->routeRedirectView('get_tire', $routeOptions, Response::HTTP_NO_CONTENT);
    }

    public function deleteAction(int $id)
    {
        $tire = $this->getTireRepository()
            ->createFindOneByIdQuery($id, $this->getUserId())
            ->getOneOrNullResult();

        if ($tire == null) {
            return new View(null, Response::HTTP_NOT_FOUND);
        }

        $em = $this->getDoctrine()->getManager();
        $em->remove($tire);
        $em->flush();

        return new View(null, Response::HTTP_NO_CONTENT);
    }

}
