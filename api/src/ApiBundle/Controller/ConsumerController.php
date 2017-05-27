<?php

namespace ApiBundle\Controller;

use ApiBundle\Entity\Consumer;
use ApiBundle\Form\Type\ConsumerType;
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
 * Class ConsumerController
 * @package AppBundle\Controller
 *
 * @RouteResource("Consumer")
 */
class ConsumerController extends FOSRestController implements ClassResourceInterface
{

    private function getConsumerRepository()
    {
        return $this->get('crv.doctrine_entity_repository.consumer');
    }

    private function getUserId()
    {
        return $this->getUser()->getId();
    }

    public function cgetAction(Request $request)
    {
        $search = $request->query->get('search', '');
        $orderBy = $request->query->get('orderby', '');
        $sort = $request->query->get('sort', '');

        $consumers = $this->getConsumerRepository()
            ->searchQuery($this->getUserId(), $search, $orderBy, $sort)
            ->getResult();

        if($consumers == null) {
            return new View(null, Response::HTTP_NOT_FOUND);
        }
        return $consumers;
    }

    public function getAction(int $id)
    {
        $consumer = $this->getConsumerRepository()
            ->createFindOneByIdQuery($id, $this->getUserId())
            ->getOneOrNullResult();

        if($consumer == null) {
            return new View(null, Response::HTTP_NOT_FOUND);
        }
        return $consumer;
    }

    public function postAction(Request $request)
    {
        $dateTime = new \DateTime('now');
        $consumer = new Consumer();

        $form = $this->createForm(ConsumerType::class, $consumer, [
            'csrf_protection' => false,
            'allow_extra_fields' => true
        ]);

        $form->submit($request->request->all());

        if (!$form->isValid()) {
            return $form;
        }

        $consumer->setUserId($this->getUserId());
        $consumer->setCreatedAt($dateTime);
        $consumer->setUpdatedAt($dateTime);

        $em = $this->getDoctrine()->getManager();
        $em->persist($consumer);
        $em->flush();

        $routeOptions = [
            'id' => $consumer->getId(),
        ];

        //return $this->routeRedirectView('get_consumer', $routeOptions, Response::HTTP_CREATED);
        return new View($routeOptions, Response::HTTP_CREATED);
    }

    public function putAction(Request $request, int $id)
    {
        $dateTime = new \DateTime('now');
        $consumer = $this->getConsumerRepository()
            ->createUpdateByIdQuery($id, $this->getUserId())
            ->getOneOrNullResult();

        if ($consumer == null) {
            return new View(null, Response::HTTP_NOT_FOUND);
        }

        $consumer->setUpdatedAt($dateTime);

        $form = $this->createForm(ConsumerType::class, $consumer, [
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
            'id' => $consumer->getId(),
        ];

        return $this->routeRedirectView('get_consumer', $routeOptions, Response::HTTP_NO_CONTENT);
    }

    public function patchAction(Request $request, int $id)
    {
        $dateTime = new \DateTime('now');
        $consumer = $this->getConsumerRepository()
            ->createUpdateByIdQuery($id, $this->getUserId())
            ->getOneOrNullResult();

        if ($consumer == null) {
            return new View(null, Response::HTTP_NOT_FOUND);
        }

        $consumer->setUpdatedAt($dateTime);

        $form = $this->createForm(ConsumerType::class, $consumer, [
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
            'id' => $consumer->getId(),
        ];

        return $this->routeRedirectView('get_consumer', $routeOptions, Response::HTTP_NO_CONTENT);
    }

    public function deleteAction(int $id)
    {
        $consumer = $this->getConsumerRepository()
            ->createUpdateByIdQuery($id, $this->getUserId())
            ->getOneOrNullResult();

        if ($consumer == null) {
            return new View(null, Response::HTTP_NOT_FOUND);
        }

        $em = $this->getDoctrine()->getManager();
        $em->remove($consumer);
        $em->flush();

        return new View(null, Response::HTTP_NO_CONTENT);
    }
}