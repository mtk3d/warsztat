<?php

namespace ApiBundle\Utils;

use Symfony\Component\DependencyInjection\ContainerInterface as Container;

class DocumentNumberGenerator
{
    private $container;

    public function __construct(Container $container) {
        $this->container = $container;
    }

    public function getNextNumber(int $userId, $type, $date)
    {
        $document = $this->container->get('crv.doctrine_entity_repository.document')
            ->createFindLastDocumentNumber($userId, $type, $date)
            ->getResult();

        if($type=='Rachunek')
            $type='R';
        else if($type=='FV')
            $type='FV';

        $month = $date->format('m');
        $year = $date->format('Y');


        if ($document == null) {
            $number = '001';
        }else{
            $number = explode(" ", $document[0]['number']);
            $number = explode("/", $number[1]);

            if($number[1]==$month && $number[2]==$year) {
                $number = intval($number[0])+1;

                if($number<10)
                    $number = '00'.$number;
                else if($number<100)
                    $number = '0'.$number;
                
            }else{
                $number = '001';
            }
        }

        return $type.' '.$number.'/'.$month.'/'.$year;
    }
}