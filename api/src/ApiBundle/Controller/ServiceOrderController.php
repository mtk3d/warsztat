<?php

namespace ApiBundle\Controller;

use ApiBundle\Entity\ServiceOrder;
use ApiBundle\Form\Type\ServiceOrderType;
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
 * Class ServiceOrderController
 * @package AppBundle\Controller
 *
 * @RouteResource("ServiceOrder")
 */
class ServiceOrderController extends FOSRestController implements ClassResourceInterface
{

    private function getServiceOrderRepository()
    {
        return $this->get('crv.doctrine_entity_repository.service_order');
    }

    private function getUserId()
    {
        return $this->getUser()->getId();
    }

    public function cgetAction(Request $request)
    {
        $from = $request->query->get('from', '');
        $to = $request->query->get('to', '');
        $search = $request->query->get('search', '');
        $orderBy = $request->query->get('order_by', '');
        $sorting = $request->query->get('sorting', '');

        $serviceOrders = $this->getServiceOrderRepository()
            ->createFindAllQuery($this->getUserId(), $from, $to, $search, $orderBy, $sorting)
            ->getResult();
            
        if($serviceOrders == null) {
            return new View(null, Response::HTTP_NOT_FOUND);
        }

        return $serviceOrders;
    }

    public function getConsumerAction(Request $request, int $consumerId)
    {
        $from = $request->query->get('from', '');
        $to = $request->query->get('to', '');
        $search = $request->query->get('search', '');
        $orderBy = $request->query->get('order_by', '');
        $sorting = $request->query->get('sorting', '');
        
        $serviceOrder = $this->getServiceOrderRepository()
            ->createFindByConsumerIdQuery($consumerId, $this->getUserId(), $from, $to, $search, $orderBy, $sorting)
            ->getResult();

        if ($serviceOrder == null) {
            return new View(null, Response::HTTP_NOT_FOUND);
        }
        return $serviceOrder;
    }

    public function getAction(int $id)
    {
        $serviceOrder = $this->getServiceOrderRepository()
            ->createFindOneByIdQuery($id, $this->getUserId())
            ->getOneOrNullResult();

        if($serviceOrder == null) {
            return new View(null, Response::HTTP_NOT_FOUND);
        }
        return $serviceOrder;
    }

    public function postAction(Request $request)
    {
        $dateTime = new \DateTime('now');
        $serviceOrder = new ServiceOrder();

        $form = $this->createForm(ServiceOrderType::class, $serviceOrder, [
            'csrf_protection' => false,
            'allow_extra_fields' => true
        ]);

        $form->submit($request->request->all());

        if (!$form->isValid()) {
            return $form;
        }

        $serviceOrder->setUserId($this->getUserId());
        $serviceOrder->setCreatedAt($dateTime);
        $serviceOrder->setUpdatedAt($dateTime);

        $em = $this->getDoctrine()->getManager();
        $em->persist($serviceOrder);
        $em->flush();

        $routeOptions = [
            'id' => $serviceOrder->getId(),
        ];

        return $this->routeRedirectView('get_serviceorder', $routeOptions, Response::HTTP_CREATED);
    }

    public function putAction(Request $request, int $id)
    {
        $dateTime = new \DateTime('now');
        $serviceOrder = $this->getServiceOrderRepository()
            ->createUpdateQuery($id, $this->getUserId())
            ->getOneOrNullResult();

        if ($serviceOrder == null) {
            return new View(null, Response::HTTP_NOT_FOUND);
        }

        $serviceOrder->setUpdatedAt($dateTime);

        $form = $this->createForm(ServiceOrderType::class, $serviceOrder, [
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
            'id' => $serviceOrder->getId(),
        ];

        return $this->routeRedirectView('get_serviceorder', $routeOptions, Response::HTTP_NO_CONTENT);
    }

    public function patchAction(Request $request, int $id)
    {
        $dateTime = new \DateTime('now');
        $serviceOrder = $this->getServiceOrderRepository()
            ->createUpdateQuery($id, $this->getUserId())
            ->getOneOrNullResult();

        if ($serviceOrder == null) {
            return new View(null, Response::HTTP_NOT_FOUND);
        }

        $serviceOrder->setUpdatedAt($dateTime);

        $form = $this->createForm(ServiceOrderType::class, $serviceOrder, [
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
            'id' => $serviceOrder->getId(),
        ];

        return $this->routeRedirectView('get_serviceorder', $routeOptions, Response::HTTP_NO_CONTENT);
    }

    public function deleteAction(int $id)
    {
        $serviceOrder = $this->getServiceOrderRepository()
            ->createUpdateQuery($id, $this->getUserId())
            ->getOneOrNullResult();

        if ($serviceOrder == null) {
            return new View(null, Response::HTTP_NOT_FOUND);
        }

        $em = $this->getDoctrine()->getManager();
        $em->remove($serviceOrder);
        $em->flush();

        return new View(null, Response::HTTP_NO_CONTENT);
    }

}