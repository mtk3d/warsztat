<?php

namespace ApiBundle\Controller;

use ApiBundle\Entity\ServiceOrderPosition;
use ApiBundle\Form\Type\ServiceOrderPositionType;
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
 * Class ServiceOrderPositionController
 * @package AppBundle\Controller
 *
 * @RouteResource("ServiceOrderPosition")
 */
class ServiceOrderPositionController extends FOSRestController implements ClassResourceInterface
{

    private function getServiceOrderPositionRepository()
    {
        return $this->get('crv.doctrine_entity_repository.service_order_position');
    }

    private function getUserId()
    {
        return $this->getUser()->getId();
    }

    public function getOrderAction(int $orderId)
    {
        $serviceOrderPosition = $this->getServiceOrderPositionRepository()
            ->createFindByOrderIdQuery($orderId, $this->getUserId())
            ->getResult();

        if ($serviceOrderPosition == null) {
            return new View(null, Response::HTTP_NOT_FOUND);
        }
        return $serviceOrderPosition;
    }

    public function getAction(int $id)
    {
        $serviceOrderPosition = $this->getServiceOrderPositionRepository()
            ->createFindOneByIdQuery($id, $this->getUserId())
            ->getOneOrNullResult();

        if($serviceOrderPosition == null) {
            return new View(null, Response::HTTP_NOT_FOUND);
        }
        return $serviceOrderPosition;
    }

    public function postAction(Request $request)
    {
        $serviceOrderPosition = new ServiceOrderPosition();

        $form = $this->createForm(ServiceOrderPositionType::class, $serviceOrderPosition, [
            'csrf_protection' => false,
            'allow_extra_fields' => true
        ]);

        $form->submit($request->request->all());

        if (!$form->isValid()) {
            return $form;
        }

        $serviceOrderPosition->setUserId($this->getUserId());

        $em = $this->getDoctrine()->getManager();
        $em->persist($serviceOrderPosition);
        $em->flush();

        $routeOptions = [
            'id' => $serviceOrderPosition->getId(),
        ];

        return $this->routeRedirectView('get_serviceorderposition', $routeOptions, Response::HTTP_CREATED);
    }

    public function putAction(Request $request, int $id)
    {
        $serviceOrderPosition = $this->getServiceOrderPositionRepository()
            ->createUpdateQuery($id, $this->getUserId())
            ->getOneOrNullResult();

        if ($serviceOrderPosition == null) {
            return new View(null, Response::HTTP_NOT_FOUND);
        }


        $form = $this->createForm(ServiceOrderPositionType::class, $serviceOrderPosition, [
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
            'id' => $serviceOrderPosition->getId(),
        ];

        return $this->routeRedirectView('get_serviceorderposition', $routeOptions, Response::HTTP_NO_CONTENT);
    }

    /*public function patchAction(Request $request, int $id)
    {
        $dateTime = new \DateTime('now');
        $document = $this->getDocumentRepository()
            ->createFindOneByIdQuery($id, $this->getUserId())
            ->getOneOrNullResult();

        if ($document == null) {
            return new View(null, Response::HTTP_NOT_FOUND);
        }

        $document->setUpdatedAt($dateTime);

        $form = $this->createForm(DocumentType::class, $document, [
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
            'id' => $document->getId(),
        ];

        return $this->routeRedirectView('get_document', $routeOptions, Response::HTTP_NO_CONTENT);
    }*/

    public function deleteAction(int $id)
    {
        $serviceOrderPosition = $this->getServiceOrderPositionRepository()
            ->createUpdateQuery($id, $this->getUserId())
            ->getOneOrNullResult();

        if ($serviceOrderPosition == null) {
            return new View(null, Response::HTTP_NOT_FOUND);
        }

        $em = $this->getDoctrine()->getManager();
        $em->remove($serviceOrderPosition);
        $em->flush();

        return new View(null, Response::HTTP_NO_CONTENT);
    }

}