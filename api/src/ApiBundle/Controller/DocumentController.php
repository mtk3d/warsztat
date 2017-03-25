<?php

namespace ApiBundle\Controller;

use ApiBundle\Entity\Document;
use ApiBundle\Form\Type\DocumentType;
use FOS\RestBundle\View\View;
use FOS\RestBundle\Controller\Annotations;
use FOS\RestBundle\View\RouteRedirectView;
use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Routing\ClassResourceInterface;
use FOS\RestBundle\Controller\Annotations\RouteResource;
use Nelmio\ApiDocBundle\Annotation\ApiDoc;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Form\FormTypeInterface;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;

/**
 * Class BlogPostsController
 * @package AppBundle\Controller
 *
 * @RouteResource("Document")
 */
class DocumentController extends FOSRestController implements ClassResourceInterface
{

    private function getDocumentRepository()
    {
        return $this->get('crv.doctrine_entity_repository.document');
    }

    private function getDocumentPositionRepository()
    {
        return $this->get('crv.doctrine_entity_repository.document_position');
    }

    private function getUserId()
    {
        return $this->getUser()->getId();
    }

    public function cgetAction()
    {
        $document = $this->getDocumentRepository()->createFindAllQuery($this->getUserId())->getResult();
        if ($document === null) {
            return new View(null, Response::HTTP_NOT_FOUND);
        }
        return $document;
    }

    public function getListAction($type)
    {
        $document = $this->getDocumentRepository()->createFindByTypeQuery($type, $this->getUserId())->getResult();
        if ($document === null) {
            return new View(null, Response::HTTP_NOT_FOUND);
        }
        return $document;
    }

    public function getConsumerAction(int $id)
    {
        $document = $this->getDocumentRepository()->createFindByConsumerIdQuery($id, $this->getUserId())->getResult();
        if ($document === null) {
            return new View(null, Response::HTTP_NOT_FOUND);
        }
        return $document;
    }

    public function getAction(int $id)
    {
        $document = $this->getDocumentRepository()->createFindOneByIdQuery($id, $this->getUserId())->getSingleResult();
        if ($document === null) {
            return new View(null, Response::HTTP_NOT_FOUND);
        }
        return $document;
    }

    public function postAction(Request $request)
    {
        $dateTime = new \DateTime('now');
        $document = new Document();
        $document->setUserId($this->getUserId());
        $document->setCreatedAt($dateTime);
        $document->setUpdatedAt($dateTime);

        $form = $this->createForm(DocumentType::class, $document, [
            'csrf_protection' => false,
            'allow_extra_fields' => true
        ]);

        $form->submit($request->request->all());

        if (!$form->isValid()) {
            return $form;
        }

        $em = $this->getDoctrine()->getManager();
        $em->persist($document);
        $em->flush();

        $routeOptions = [
            'id' => $document->getId(),
        ];

        return $this->routeRedirectView('get_document', $routeOptions, Response::HTTP_CREATED);
    }

    public function putAction(Request $request, int $id)
    {
        $dateTime = new \DateTime('now');
        $document = $this->getDocumentRepository()->find($id);
        $document->setUpdatedAt($dateTime);

        if ($document === null) {
            return new View(null, Response::HTTP_NOT_FOUND);
        }

        $form = $this->createForm(DocumentType::class, $document, [
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
            'id' => $document->getId(),
        ];

        return $this->routeRedirectView('get_document', $routeOptions, Response::HTTP_NO_CONTENT);
    }

    public function patchAction(Request $request, int $id)
    {
        $dateTime = new \DateTime('now');
        $document = $this->getDocumentRepository()->find($id);
        $document->setUpdatedAt($dateTime);

        if ($document === null) {
            return new View(null, Response::HTTP_NOT_FOUND);
        }

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
    }

    public function deleteAction(int $id)
    {
        $document = $this->getDocumentRepository()->find($id);

        if ($document === null) {
            return new View(null, Response::HTTP_NOT_FOUND);
        }

        $em = $this->getDoctrine()->getManager();
        $em->remove($document);
        $em->flush();

        return new View(null, Response::HTTP_NO_CONTENT);
    }

}