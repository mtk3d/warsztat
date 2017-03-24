<?php

namespace ApiBundle\Tests\Controller;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;
use ApiBundle\Entity\Document;
use ApiBundle\Controller\DocumentController;
use Doctrine\ORM\EntityRepository;
use Doctrine\Common\Persistence\ObjectManager;
use PHPUnit\Framework\TestCase;

class DefaultControllerTest extends WebTestCase
{
     /**
     * Create a client with a default Authorization header.
     *
     * @param string $username
     * @param string $password
     *
     * @return \Symfony\Bundle\FrameworkBundle\Client
     */
    protected function createAuthenticatedClient($username = 'user', $password = 'password')
    {
        $client = static::createClient();
        $client->request(
            'POST',
            '/api/login_check',
            array(
                '_username' => $username,
                '_password' => $password,
            )
        );

        $data = json_decode($client->getResponse()->getContent(), true);

        $client = static::createClient();
        $client->setServerParameter('HTTP_Authorization', sprintf('Bearer %s', $data['token']));

        return $client;
    }

    /**
     * test getPagesAction
     */
    public function testGetPages()
    {
        $client = $this->createAuthenticatedClient();
        $client->request('GET', '/api/pages');
    }

    public function testDocument()
    {

        $client = $this->createAuthenticatedClient();
        $client->request('GET', '/api/document/list');

        $response = $client->getResponse();
        $content = $response->getContent();

        $this->assertJsonStringEqualsJsonString(
            json_encode(
                '[{"id":1,"number":"FV 0\/0\/0001","type":"FV","date":{"date":"2017-03-20 15:40:08.000000","timezone_type":3,"timezone":"UTC"},"dateOfPayment":{"date":"2017-03-20 15:40:08.000000","timezone_type":3,"timezone":"UTC"},"paymentMethod":"Got\u00f3wka","paid":true}]'),
            json_encode($content)
        );
        $client->request('GET', '/api/document/list/invoices');

        $response = $client->getResponse();
        $content = $response->getContent();

        $this->assertJsonStringEqualsJsonString(
            json_encode(
                '[{"id":1,"number":"FV 0\/0\/0001","type":"FV","date":{"date":"2017-03-20 15:40:08.000000","timezone_type":3,"timezone":"UTC"},"dateOfPayment":{"date":"2017-03-20 15:40:08.000000","timezone_type":3,"timezone":"UTC"},"paymentMethod":"Got\u00f3wka","paid":true}]'),
            json_encode($content)
        );

        $client->request('GET', '/api/document/list/bills');

        $response = $client->getResponse();
        $content = $response->getContent();

        $this->assertJsonStringEqualsJsonString(
            json_encode(
                '{"message":"Not found bills documents"}'),
            json_encode($content)
        );
    }

    public function testDocumentId()
    {

        $client = $this->createAuthenticatedClient();
        $client->request('GET', '/api/document/1');

        $response = $client->getResponse();
        $content = $response->getContent();

        $this->assertJsonStringEqualsJsonString(
            json_encode(
                '{"document":[{"id":1,"userId":1,"consumerId":1,"type":"FV","number":"FV 0\/0\/0001","date":{"date":"2017-03-20 15:40:08.000000","timezone_type":3,"timezone":"UTC"},"dateOfPayment":{"date":"2017-03-20 15:40:08.000000","timezone_type":3,"timezone":"UTC"},"paymentMethod":"Got\u00f3wka","paid":true,"bank":null,"bankAccount":null,"place":null,"vat":23,"netto":78,"brutto":100,"vatSum":23,"notes":null,"createdAt":{"date":"2017-03-20 15:40:08.000000","timezone_type":3,"timezone":"UTC"},"updatedAt":{"date":"2017-03-20 15:40:08.000000","timezone_type":3,"timezone":"UTC"}}],"positions":[{"id":1,"name":"Wymiana opon","netto":38.5,"brutto":50,"vat":23,"vatSum":11.5,"quantity":1}]}'),
            json_encode($content)
        );
    }

}
