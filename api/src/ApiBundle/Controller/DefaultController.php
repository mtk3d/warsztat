<?php

namespace ApiBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;

class DefaultController extends Controller
{
    /**
     * @Route("/")
     */
    public function indexAction()
    {
        return $this->render('ApiBundle:Default:index.html.twig');
    }

    /**
     * @Route("/api/pages", name="api_pages")
     */
    public function apiPagesAction(Request $request)
    {
        $data = [
            "data" => "JWT Token is valid"
        ];
        $response = new JsonResponse();
        return $response->setData($data);
    }

}
