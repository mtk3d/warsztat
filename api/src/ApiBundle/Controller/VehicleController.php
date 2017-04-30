<?php

namespace ApiBundle\Controller;

use ApiBundle\Entity\Vehicle;
use ApiBundle\Form\Type\VehicleType;
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
 * Class VehicleController
 * @package AppBundle\Controller
 *
 * @RouteResource("Vehicle")
 */
class VehicleController extends FOSRestController implements ClassResourceInterface
{
    
    private function getVehicleRepository()
    {
        return $this->get('crv.doctrine_entity_repository.vehicle');
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

        $vehicles = $this->getVehicleRepository()
            ->createFindAllQuery($this->getUserId(), $search, $orderBy, $sort)
            ->getResult();

        if($vehicles == null) {
            return new View(null, Response::HTTP_NOT_FOUND);
        }
        return $vehicles;
    }

    public function getConsumerAction(int $consumerId)
    {
        $vehicle = $this->getVehicleRepository()
            ->createFindByConsumerIdQuery($consumerId, $this->getUserId())
            ->getResult();

        if ($vehicle == null) {
            return new View(null, Response::HTTP_NOT_FOUND);
        }
        return $vehicle;
    }

    public function getAction(int $id)
    {
        $vehicle = $this->getVehicleRepository()
            ->createFindOneByIdQuery($id, $this->getUserId())
            ->getOneOrNullResult();

        if($vehicle == null) {
            return new View(null, Response::HTTP_NOT_FOUND);
        }
        return $vehicle;
    }

    public function postAction(Request $request)
    {
        $dateTime = new \DateTime('now');
        $vehicle = new Vehicle();

        $form = $this->createForm(VehicleType::class, $vehicle, [
            'csrf_protection' => false,
            'allow_extra_fields' => true
        ]);

        $form->submit($request->request->all());

        if (!$form->isValid()) {
            return $form;
        }

        $vehicle->setUserId($this->getUserId());
        $vehicle->setCreatedAt($dateTime);
        $vehicle->setUpdatedAt($dateTime);

        $em = $this->getDoctrine()->getManager();
        $em->persist($vehicle);
        $em->flush();

        $routeOptions = [
            'id' => $vehicle->getId(),
        ];

        return $this->routeRedirectView('get_vehicle', $routeOptions, Response::HTTP_CREATED);
    }

    public function putAction(Request $request, int $id)
    {
        $dateTime = new \DateTime('now');
        $vehicle = $this->getVehicleRepository()
            ->createUpdateByIdQuery($id, $this->getUserId())
            ->getOneOrNullResult();

        if ($vehicle == null) {
            return new View(null, Response::HTTP_NOT_FOUND);
        }

        $vehicle->setUpdatedAt($dateTime);

        $form = $this->createForm(vehicleType::class, $vehicle, [
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
            'id' => $vehicle->getId(),
        ];

        return $this->routeRedirectView('get_vehicle', $routeOptions, Response::HTTP_NO_CONTENT);
    }

    public function patchAction(Request $request, int $id)
    {
        $dateTime = new \DateTime('now');
        $vehicle = $this->getVehicleRepository()
            ->createUpdateByIdQuery($id, $this->getUserId())
            ->getOneOrNullResult();

        if ($vehicle == null) {
            return new View(null, Response::HTTP_NOT_FOUND);
        }

        $vehicle->setUpdatedAt($dateTime);

        $form = $this->createForm(vehicleType::class, $vehicle, [
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
            'id' => $vehicle->getId(),
        ];

        return $this->routeRedirectView('get_vehicle', $routeOptions, Response::HTTP_NO_CONTENT);
    }

    public function deleteAction(int $id)
    {
        $vehicle = $this->getVehicleRepository()
            ->createUpdateByIdQuery($id, $this->getUserId())
            ->getOneOrNullResult();

        if ($vehicle == null) {
            return new View(null, Response::HTTP_NOT_FOUND);
        }

        $em = $this->getDoctrine()->getManager();
        $em->remove($vehicle);
        $em->flush();

        return new View(null, Response::HTTP_NO_CONTENT);
    }

}
