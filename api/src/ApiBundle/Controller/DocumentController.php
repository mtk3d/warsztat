<?php

namespace ApiBundle\Controller;

use ApiBundle\Entity\Document;
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
    public function getAction(int $id)
    {
        return $this->getDoctrine()->getRepository('ApiBundle:Document')->find($id);
    }
}
