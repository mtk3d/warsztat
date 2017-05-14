<?php

namespace ApiBundle\Controller;

use ApiBundle\Entity\Service;
use ApiBundle\Form\Type\ServiceType;
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
 * Class ServiceController
 * @package AppBundle\Controller
 *
 * @RouteResource("Service")
 */
class ServiceController extends FOSRestController implements ClassResourceInterface
{
    
    private function getServiceRepository()
    {
        return $this->get('crv.doctrine_entity_repository.service');
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

        $services = $this->getServiceRepository()
            ->createFindAllQuery($this->getUserId(), $search, $orderBy, $sort)
            ->getResult();

        if($services == null) {
            return new View(null, Response::HTTP_NOT_FOUND);
        }
        return $services;
    }

    public function getAction(int $id)
    {
        $service = $this->getServiceRepository()
            ->createFindOneByIdQuery($id, $this->getUserId())
            ->getOneOrNullResult();

        if($service == null) {
            return new View(null, Response::HTTP_NOT_FOUND);
        }
        return $service;
    }

    public function postAction(Request $request)
    {
        $service = new Service();

        $form = $this->createForm(ServiceType::class, $service, [
            'csrf_protection' => false,
            'allow_extra_fields' => true
        ]);

        $form->submit($request->request->all());

        if (!$form->isValid()) {
            return $form;
        }

        $service->setUserId($this->getUserId());

        $em = $this->getDoctrine()->getManager();
        $em->persist($service);
        $em->flush();

        $routeOptions = [
            'id' => $service->getId(),
        ];

        return $this->routeRedirectView('get_service', $routeOptions, Response::HTTP_CREATED);
    }

    public function putAction(Request $request, int $id)
    {
        $service = $this->getServiceRepository()
            ->createUpdateQuery($id, $this->getUserId())
            ->getOneOrNullResult();

        if ($service == null) {
            return new View(null, Response::HTTP_NOT_FOUND);
        }

        $form = $this->createForm(ServiceType::class, $service, [
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
            'id' => $service->getId(),
        ];

        return $this->routeRedirectView('get_service', $routeOptions, Response::HTTP_NO_CONTENT);
    }

    public function patchAction(Request $request, int $id)
    {
        $service = $this->getServiceRepository()
            ->createUpdateQuery($id, $this->getUserId())
            ->getOneOrNullResult();

        if ($service == null) {
            return new View(null, Response::HTTP_NOT_FOUND);
        }

        $form = $this->createForm(ServiceType::class, $service, [
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
            'id' => $service->getId(),
        ];

        return $this->routeRedirectView('get_service', $routeOptions, Response::HTTP_NO_CONTENT);
    }

    public function deleteAction(int $id)
    {
        $service = $this->getServiceRepository()
            ->createUpdateQuery($id, $this->getUserId())
            ->getOneOrNullResult();

        if ($service == null) {
            return new View(null, Response::HTTP_NOT_FOUND);
        }

        $em = $this->getDoctrine()->getManager();
        $em->remove($service);
        $em->flush();

        return new View(null, Response::HTTP_NO_CONTENT);
    }

}