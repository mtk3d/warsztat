<?php

namespace ApiBundle\Controller;

use ApiBundle\Entity\Store;
use ApiBundle\Form\Type\StoreType;
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
 * Class StoreController
 * @package AppBundle\Controller
 *
 * @RouteResource("Store")
 */
class StoreController extends FOSRestController implements ClassResourceInterface
{
    
    private function getStoreRepository()
    {
        return $this->get('crv.doctrine_entity_repository.Store');
    }

    private function getUserId()
    {
        return $this->getUser()->getId();
    }

    public function cgetAction()
    {
        $stores = $this->getstoreRepository()
            ->createFindAllQuery($this->getUserId())
            ->getResult();

        if($stores == null) {
            return new View(null, Response::HTTP_NOT_FOUND);
        }
        return $stores;
    }

    public function getAction(int $id)
    {
        $store = $this->getStoreRepository()
            ->createFindOneByIdQuery($id, $this->getUserId())
            ->getOneOrNullResult();

        if($store == null) {
            return new View(null, Response::HTTP_NOT_FOUND);
        }
        return $store;
    }

    public function postAction(Request $request)
    {
        $store = new Store();

        $form = $this->createForm(StoreType::class, $store, [
            'csrf_protection' => false,
            'allow_extra_fields' => true
        ]);

        $form->submit($request->request->all());

        if (!$form->isValid()) {
            return $form;
        }

        $store->setUserId($this->getUserId());

        $em = $this->getDoctrine()->getManager();
        $em->persist($store);
        $em->flush();

        $routeOptions = [
            'id' => $store->getId(),
        ];

        return $this->routeRedirectView('get_store', $routeOptions, Response::HTTP_CREATED);
    }

    public function putAction(Request $request, int $id)
    {
        $store = $this->getStoreRepository()
            ->createFindOneByIdQuery($id, $this->getUserId())
            ->getOneOrNullResult();

        if ($store == null) {
            return new View(null, Response::HTTP_NOT_FOUND);
        }

        $form = $this->createForm(StoreType::class, $store, [
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
            'id' => $store->getId(),
        ];

        return $this->routeRedirectView('get_store', $routeOptions, Response::HTTP_NO_CONTENT);
    }

    public function patchAction(Request $request, int $id)
    {
        $store = $this->getStoreRepository()
            ->createFindOneByIdQuery($id, $this->getUserId())
            ->getOneOrNullResult();

        if ($store == null) {
            return new View(null, Response::HTTP_NOT_FOUND);
        }

        $form = $this->createForm(StoreType::class, $store, [
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
            'id' => $store->getId(),
        ];

        return $this->routeRedirectView('get_store', $routeOptions, Response::HTTP_NO_CONTENT);
    }

    public function deleteAction(int $id)
    {
        $store = $this->getStoreRepository()
            ->createFindOneByIdQuery($id, $this->getUserId())
            ->getOneOrNullResult();

        if ($store == null) {
            return new View(null, Response::HTTP_NOT_FOUND);
        }

        $em = $this->getDoctrine()->getManager();
        $em->remove($store);
        $em->flush();

        return new View(null, Response::HTTP_NO_CONTENT);
    }

}