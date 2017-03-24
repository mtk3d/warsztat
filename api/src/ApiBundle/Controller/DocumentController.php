<?php

namespace ApiBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use ApiBundle\Entity\Document;
use ApiBundle\Form\Type\DocumentType;

/**
* @Route("/api/document")
*/
class DocumentController extends Controller
{
    /**
     * @Route("/list/{type}")
     * @Route("/")
     * @Method({"GET"})
     */
    public function documentListAction($type = 'all')
    {
        $username = $this->get('security.token_storage')->getToken()->getUsername();
        $userId = $this->getDoctrine()->getRepository('ApiBundle:User')->getId($username);

        $documents = $this->getDoctrine()
            ->getRepository('ApiBundle:Document')
            ->getList($type, $userId);

        if(empty($documents))
        {
            $documents = ["message" => "Not found $type documents"];
        }

        $response = new JsonResponse();
        return $response->setData($documents);
    }

    /**
     * @Route("/{id}")
     * @Method({"GET"})
     */
    public function documentAction($id)
    {
        $username = $this->get('security.token_storage')->getToken()->getUsername();
        $userId = $this->getDoctrine()->getRepository('ApiBundle:User')->getId($username);

        $document = $this->getDoctrine()
            ->getRepository('ApiBundle:Document')
            ->findById($id, $userId);

        $documentPositions = $this->getDoctrine()
            ->getRepository('ApiBundle:DocumentPosition')
            ->findByDocumentId($id);
        if(empty($document))
        {
            $data = ["message" => "Document not found"];
        }else{
            $data = [
                "document" => $document,
                "positions" => $documentPositions
            ];
        }
        $response = new JsonResponse();
        return $response->setData($data);
    }

    /**
     * @Route("")
     * @Method({"POST"})
     */
    public function documentStoreAction(Request $request)
    {
        $form = $this->createForm(DocumentType::class, null, [
            'csrf_protection' => false,
        ]);

        $form->submit($request->request->all());

        $content = $request->getContent();

        if (!$form->isValid()) {
            return $form;
        }

        $document = $form->getData();

        $em = $this->getDoctrine()->getManager();
        $em->persist($document);
        $em->flush();

        $routeOptions = [
            'id' => $document->getId(),
        ];

        return $this->routeRedirectView('document', $routeOptions, Response::HTTP_CREATED);
    }

    /**
     * @Route("/{id}")
     * @Method({"PUT", "PATCH"})
     */
    public function documentUpdateAction($id)
    {
        $data = ["message" => "documentUpdate"];
        
        $response = new JsonResponse();
        return $response->setData($data);
    }

    /**
     * @Route("/{id}")
     * @Method({"DELETE"})
     */
    public function documentDeleteAction($id)
    {
        $data = ["message" => "documentDelete"];
        
        $response = new JsonResponse();
        return $response->setData($data);
    }

}
