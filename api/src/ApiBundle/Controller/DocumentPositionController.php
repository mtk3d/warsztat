<?php

namespace ApiBundle\Controller;

use ApiBundle\Entity\DocumentPosition;
use ApiBundle\Form\Type\DocumentPositionType;
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
 * Class DocumentPositionController
 * @package AppBundle\Controller
 *
 * @RouteResource("DocumentPosition")
 */
class DocumentPositionController extends FOSRestController implements ClassResourceInterface
{

    private function getDocumentPositionRepository()
    {
        return $this->get('crv.doctrine_entity_repository.document_position');
    }

    private function getDocumentRepository()
    {
        return $this->get('crv.doctrine_entity_repository.document');
    }

    private function getUserId()
    {
        return $this->getUser()->getId();
    }

    public function getDocumentAction(int $documentId)
    {
        $documentPosition = $this->getDocumentPositionRepository()
            ->createFindByDocumentIdQuery($documentId, $this->getUserId())
            ->getResult();

        if ($documentPosition == null) {
            return new View(null, Response::HTTP_NOT_FOUND);
        }
        return $documentPosition;
    }

    public function getAction(int $id)
    {
        $documentPosition = $this->getDocumentPositionRepository()
            ->createFindOneByIdQuery($id, $this->getUserId())
            ->getOneOrNullResult();

        if($documentPosition == null) {
            return new View(null, Response::HTTP_NOT_FOUND);
        }
        return $documentPosition;
    }

    public function postAction(Request $request)
    {
        $dateTime = new \DateTime('now');
        $documentPosition = new DocumentPosition();

        $documentId = $request->request->get('documentId');

        if(!isset($documentId))
        {
            return new View(null, Response::HTTP_NOT_FOUND);
        }

        $form = $this->createForm(DocumentPositionType::class, $documentPosition, [
            'csrf_protection' => false,
            'allow_extra_fields' => true
        ]);

        $form->submit($request->request->all());

        if (!$form->isValid()) {
            return $form;
        }

        $documentPosition->setUserId($this->getUserId());
        $documentPosition->setDocumentId($documentId);
        $documentPosition->setCreatedAt($dateTime);
        $documentPosition->setUpdatedAt($dateTime);

        $em = $this->getDoctrine()->getManager();
        $em->persist($documentPosition);
        $em->flush();

        $routeOptions = [
            'id' => $documentPosition->getDocumentId(),
        ];

        return $this->routeRedirectView('get_document', $routeOptions, Response::HTTP_CREATED);
    }

    public function putAction(Request $request, int $id)
    {
        $dateTime = new \DateTime('now');
        $documentPosition = $this->getDocumentPositionRepository()
            ->createUpdateQuery($id, $this->getUserId())
            ->getOneOrNullResult();

        if ($documentPosition == null) {
            return new View(null, Response::HTTP_NOT_FOUND);
        }

        $documentPosition->setUpdatedAt($dateTime);

        $form = $this->createForm(DocumentPositionType::class, $documentPosition, [
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
            'id' => $documentPosition->getDocumentId(),
        ];

        return $this->routeRedirectView('get_document', $routeOptions, Response::HTTP_NO_CONTENT);
    }

    public function patchAction(Request $request, int $id)
    {
        $dateTime = new \DateTime('now');
        $documentPosition = $this->getDocumentPositionRepository()
            ->createUpdateQuery($id, $this->getUserId())
            ->getOneOrNullResult();

        if ($documentPosition == null) {
            return new View(null, Response::HTTP_NOT_FOUND);
        }

        $documentPosition->setUpdatedAt($dateTime);

        $form = $this->createForm(DocumentPositionType::class, $documentPosition, [
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
            'id' => $documentPosition->getId(),
        ];

        return $this->routeRedirectView('get_document', $routeOptions, Response::HTTP_NO_CONTENT);
    }

    public function deleteAction(int $id)
    {
        $documentPosition = $this->getDocumentPositionRepository()
            ->createUpdateQuery($id, $this->getUserId())
            ->getOneOrNullResult();

        if ($documentPosition == null) {
            return new View(null, Response::HTTP_NOT_FOUND);
        }

        $em = $this->getDoctrine()->getManager();
        $em->remove($documentPosition);
        $em->flush();

        return new View(null, Response::HTTP_NO_CONTENT);
    }

}