<?php

namespace ApiBundle\Controller;

use ApiBundle\Entity\CarRent;
use ApiBundle\Form\Type\CarRentType;
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
 * Class CarRentController
 * @package AppBundle\Controller
 *
 * @RouteResource("CarRent")
 */
class CarRentController extends FOSRestController implements ClassResourceInterface
{

    private function getCarRentRepository()
    {
        return $this->get('crv.doctrine_entity_repository.car_rent');
    }

    private function getUserId()
    {
        return $this->getUser()->getId();
    }

    public function cgetAction()
    {
        $carRents = $this->getCarRentRepository()
            ->createFindAllQuery($this->getUserId())
            ->getResult();

        if($carRents == null) {
            return new View(null, Response::HTTP_NOT_FOUND);
        }
        return $carRents;
    }

    public function getAction(int $id)
    {
        $carRent = $this->getCarRentRepository()
            ->createFindOneByIdQuery($id, $this->getUserId())
            ->getOneOrNullResult();

        if($carRent == null) {
            return new View(null, Response::HTTP_NOT_FOUND);
        }
        return $carRent;
    }

    public function postAction(Request $request)
    {
        $carRent = new CarRent();

        $form = $this->createForm(CarRentType::class, $carRent, [
            'csrf_protection' => false,
            'allow_extra_fields' => true
        ]);

        $form->submit($request->request->all());

        if (!$form->isValid()) {
            return $form;
        }

        $carRent->setUserId($this->getUserId());

        $em = $this->getDoctrine()->getManager();
        $em->persist($carRent);
        $em->flush();

        $routeOptions = [
            'id' => $carRent->getId(),
        ];

        return $this->routeRedirectView('get_carrent', $routeOptions, Response::HTTP_CREATED);
    }

    public function putAction(Request $request, int $id)
    {
        $carRent = $this->getCarRentRepository()
            ->createFindOneByIdQuery($id, $this->getUserId())
            ->getOneOrNullResult();

        if ($carRent == null) {
            return new View(null, Response::HTTP_NOT_FOUND);
        }

        $form = $this->createForm(CarRentType::class, $carRent, [
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
            'id' => $carRent->getId(),
        ];

        return $this->routeRedirectView('get_carrent', $routeOptions, Response::HTTP_NO_CONTENT);
    }

    public function patchAction(Request $request, int $id)
    {
        $carRent = $this->getCarRentRepository()
            ->createFindOneByIdQuery($id, $this->getUserId())
            ->getOneOrNullResult();

        if ($carRent == null) {
            return new View(null, Response::HTTP_NOT_FOUND);
        }

        $form = $this->createForm(CarRentType::class, $carRent, [
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
            'id' => $carRent->getId(),
        ];

        return $this->routeRedirectView('get_carrent', $routeOptions, Response::HTTP_NO_CONTENT);
    }

    public function deleteAction(int $id)
    {
        $carRent = $this->getCarRentRepository()
            ->createFindOneByIdQuery($id, $this->getUserId())
            ->getOneOrNullResult();

        if ($carRent == null) {
            return new View(null, Response::HTTP_NOT_FOUND);
        }

        $em = $this->getDoctrine()->getManager();
        $em->remove($carRent);
        $em->flush();

        return new View(null, Response::HTTP_NO_CONTENT);
    }

}