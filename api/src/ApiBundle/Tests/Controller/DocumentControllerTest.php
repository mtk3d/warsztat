<?php

namespace ApiBundle\Tests\Controller;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class DocumentControllerTest extends WebTestCase
{
    public function testDocumentList()
    {
        $client = static::createClient();

        $crawler = $client->request('GET', 'api/document/list');
    }

   

}
