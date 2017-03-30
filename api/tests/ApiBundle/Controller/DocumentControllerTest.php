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

    public function testStoreName()
    {
        $json = '{"name":"FOO", "address":"fubar City", "nickname":"fubar"}';
        $jsonDecode = json_decode($json, true);
        $name = $jsonDecode['name'];
        $post = $this->request('POST', '/api/documents', null, array(), array(), array(), $json);

        $this->assertTrue($this->client->getResponse()->isOk());

        $output= json_decode($this->client->getResponse()->getContent());

        $this->assertEquals($name, $output->name, 'Name incorrect'); 

    }
}
