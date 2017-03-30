<?php

namespace ApiBundle\Controller;

use ApiBundle\Entity\Employee;
use ApiBundle\Form\Type\EmployeeType;
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
 * Class EmployeeController
 * @package AppBundle\Controller
 *
 * @RouteResource("Employee")
 */
class EmployeeController extends FOSRestController implements ClassResourceInterface
{

    private function getEmployeeRepository()
    {
        return $this->get('crv.doctrine_entity_repository.employee');
    }

    private function getUserId()
    {
        return $this->getUser()->getId();
    }

    public function cgetAction()
    {
        $employees = $this->getEmployeeRepository()
            ->createFindAllQuery($this->getUserId())
            ->getResult();

        if($employees == null) {
            return new View(null, Response::HTTP_NOT_FOUND);
        }
        return $employees;
    }

    public function getAction(int $id)
    {
        $employee = $this->getEmployeeRepository()
            ->createFindOneByIdQuery($id, $this->getUserId())
            ->getOneOrNullResult();

        if($employee == null) {
            return new View(null, Response::HTTP_NOT_FOUND);
        }
        return $employee;
    }

    public function postAction(Request $request)
    {
        $dateTime = new \DateTime('now');
        $employee = new Employee();

        $form = $this->createForm(EmployeeType::class, $employee, [
            'csrf_protection' => false,
            'allow_extra_fields' => true
        ]);

        $form->submit($request->request->all());

        if (!$form->isValid()) {
            return $form;
        }

        $employee->setUserId($this->getUserId());
        $employee->setCreatedAt($dateTime);
        $employee->setUpdatedAt($dateTime);

        $em = $this->getDoctrine()->getManager();
        $em->persist($employee);
        $em->flush();

        $routeOptions = [
            'id' => $employee->getId(),
        ];

        return $this->routeRedirectView('get_employee', $routeOptions, Response::HTTP_CREATED);
    }

    public function putAction(Request $request, int $id)
    {
        $dateTime = new \DateTime('now');
        $employee = $this->getEmployeeRepository()
            ->createFindOneByIdQuery($id, $this->getUserId())
            ->getOneOrNullResult();

        if ($employee == null) {
            return new View(null, Response::HTTP_NOT_FOUND);
        }

        $employee->setUpdatedAt($dateTime);

        $form = $this->createForm(EmployeeType::class, $employee, [
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
            'id' => $employee->getId(),
        ];

        return $this->routeRedirectView('get_employee', $routeOptions, Response::HTTP_NO_CONTENT);
    }

    public function patchAction(Request $request, int $id)
    {
        $dateTime = new \DateTime('now');
        $employee = $this->getemployeeRepository()
            ->createFindOneByIdQuery($id, $this->getUserId())
            ->getOneOrNullResult();

        if ($employee == null) {
            return new View(null, Response::HTTP_NOT_FOUND);
        }

        $employee->setUpdatedAt($dateTime);

        $form = $this->createForm(EmployeeType::class, $employee, [
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
            'id' => $employee->getId(),
        ];

        return $this->routeRedirectView('get_employee', $routeOptions, Response::HTTP_NO_CONTENT);
    }

    public function deleteAction(int $id)
    {
        $employee = $this->getEmployeeRepository()
            ->createFindOneByIdQuery($id, $this->getUserId())
            ->getOneOrNullResult();

        if ($employee == null) {
            return new View(null, Response::HTTP_NOT_FOUND);
        }

        $em = $this->getDoctrine()->getManager();
        $em->remove($employee);
        $em->flush();

        return new View(null, Response::HTTP_NO_CONTENT);
    }

}