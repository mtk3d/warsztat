<?php

namespace ApiBundle\Controller;

use ApiBundle\Entity\CarRentHistory;
use ApiBundle\Form\Type\CarRentHistoryType;
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
 * Class CarRentHistoryController
 * @package AppBundle\Controller
 *
 * @RouteResource("CarRentHistory")
 */
class CarRentHistoryController extends FOSRestController implements ClassResourceInterface
{

    private function getCarRentHistoryRepository()
    {
        return $this->get('crv.doctrine_entity_repository.car_rent_history');
    }

    private function getCarRentRepository()
    {
        return $this->get('crv.doctrine_entity_repository.car_rent');
    }

    private function getUserId()
    {
        return $this->getUser()->getId();
    }

    public function getRentAction(int $carId)
    {
        $carRentHistories = $this->getCarRentHistoryRepository()
            ->createFindByRentIdQuery($carId, $this->getUserId())
            ->getResult();

        if($carRentHistories == null) {
            return new View(null, Response::HTTP_NOT_FOUND);
        }
        return $carRentHistories;
    }

    public function getAction(int $id)
    {
        $carRentHistory = $this->getCarRentHistoryRepository()
            ->createFindOneByIdQuery($id, $this->getUserId())
            ->getOneOrNullResult();

        if($carRentHistory == null) {
            return new View(null, Response::HTTP_NOT_FOUND);
        }
        return $carRentHistory;
    }

    public function postAction(Request $request)
    {
        $dateTime = new \DateTime('now');
        $carRentHistory = new CarRentHistory();

        $form = $this->createForm(CarRentHistoryType::class, $carRentHistory, [
            'csrf_protection' => false,
            'allow_extra_fields' => true
        ]);

        $form->submit($request->request->all());

        if (!$form->isValid()) {
            return $form;
        }

        $id = $request->request->get('carId');

        $carRent = $this->getCarRentRepository()
            ->createFindOneByIdQuery($id, $this->getUserId())
            ->getOneOrNullResult();

        if ($carRent == null) {
            return new View(null, Response::HTTP_NOT_MODIFIED);
        }

        $course = $request->request->get('course');
        $courseDifference = intval($course)-intval($carRent->getCourse());

        $carRent->setCourse($course);
        $carRent->setLoan(true);

        $carRentHistory->setUserId($this->getUserId());
        $carRentHistory->setCourseDifference($courseDifference);
        $carRentHistory->setCreatedAt($dateTime);
        $carRentHistory->setUpdatedAt($dateTime);

        $em = $this->getDoctrine()->getManager();
        $em->persist($carRentHistory);
        $em->flush();

        $em->persist($carRent);
        $em->flush();

        $routeOptions = [
            'id' => $carRentHistory->getId(),
        ];

        return $this->routeRedirectView('get_carrenthistory', $routeOptions, Response::HTTP_CREATED);
    }

    public function deleteAction(int $id)
    {
        $carRentHistory = $this->getCarRentHistoryRepository()
            ->createFindOneByIdQuery($id, $this->getUserId())
            ->getOneOrNullResult();

        if ($carRentHistory == null) {
            return new View(null, Response::HTTP_NOT_FOUND);
        }

        $carId = $carRentHistory->getCarId();

        $carRentHistory = $this->getCarRentHistoryRepository()
            ->createFindLastQuery($carId, $this->getUserId())
            ->getOneOrNullResult();

        if ($carRentHistory == null || $carRentHistory->getId()!=$id) {
            return new View(null, Response::HTTP_NOT_FOUND);
        }

        $id = $carRentHistory->getCarId();

        $carRent = $this->getCarRentRepository()
            ->createFindOneByIdQuery($carId, $this->getUserId())
            ->getOneOrNullResult();

        if ($carRent == null) {
            return new View(null, Response::HTTP_NOT_MODIFIED);
        }

        $course = intval($carRent->getCourse())-intval($carRentHistory->getCourseDifference());

        $carRent->setCourse($course);

        $em = $this->getDoctrine()->getManager();
        $em->remove($carRentHistory);
        $em->flush();

        $em->persist($carRent);
        $em->flush();

        return new View(null, Response::HTTP_NO_CONTENT);
    }

}