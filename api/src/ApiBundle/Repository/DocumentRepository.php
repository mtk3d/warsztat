<?php

namespace ApiBundle\Repository;

/**
 * DocumentRepository
 *
 * This class was generated by the Doctrine ORM. Add your own custom
 * repository methods below.
 */
class DocumentRepository extends \Doctrine\ORM\EntityRepository
{
    public function createFindOneByIdQuery(int $id, int $userId)
    {
        $query = $this->_em->createQuery(
            "
            SELECT d, c
            FROM ApiBundle:Document d
            JOIN d.consumer c
            WHERE d.id = :id
            AND d.userId = :userId
            "
        );

        $query->setParameter('id', $id);
        $query->setParameter('userId', $userId);

        return $query;
    }

    public function createFindByConsumerIdQuery(int $consumerId, int $userId)
    {
        $query = $this->_em->createQuery(
            "
            SELECT d
            FROM ApiBundle:Document d
            WHERE d.consumerId = :consumerId
            AND d.userId = :userId
            "
        );

        $query->setParameter('consumerId', $consumerId);
        $query->setParameter('userId', $userId);

        return $query;
    }

    public function createFindByTypeQuery($type, int $userId)
    {
        $query = $this->_em->createQuery(
            "
            SELECT d
            FROM ApiBundle:Document d
            WHERE d.type = :type
            AND d.userId = :userId
            "
        );
        if($type=='bills')
            $type="Rachunek";
        else if($type=='invoices')
            $type="FV";
        else
            $type="";

        $query->setParameter('type', $type);
        $query->setParameter('userId', $userId);

        return $query;
    }

    public function createFindAllQuery(int $userId, string $type, string $from, string $to, string $search, string $orderBy, string $sort)
    {
        if($type!='')
        {
            $type = "AND d.type = '".$type."'";
        }
        if($from!='')
        {
            $from = "AND d.date >= '".$from."'";
        }
        if($to!='')
        {
            $to = "AND d.date <= '".$to."'";
        }
        if($search!='')
        {
            $searchStr = '%'.$search.'%';
            $search = "AND (d.number LIKE '".$searchStr
            ."' OR d.date LIKE '".$searchStr
            ."' OR d.dateOfPayment LIKE '".$searchStr
            ."' OR d.paymentMethod LIKE '".$searchStr
            ."' OR d.notes LIKE '".$searchStr
            ."' OR c.company LIKE '".$searchStr
            ."' OR c.name LIKE '".$searchStr
            ."' OR c.nip LIKE '".$searchStr
            ."' OR c.phone LIKE '".$searchStr
            ."' OR c.pesel LIKE '".$searchStr
            ."' OR c.email LIKE '".$searchStr
            ."' OR c.www LIKE '".$searchStr
            ."' OR c.street LIKE '".$searchStr
            ."' OR c.place LIKE '".$searchStr
            ."' OR c.postalCode LIKE '".$searchStr
            ."' OR c.post LIKE '".$searchStr
            ."' OR c.notes LIKE '".$searchStr."')";
        }
        if($orderBy!='')
        {
            if($orderBy == 'number' || 
                $orderBy == 'type' || 
                $orderBy == 'date' || 
                $orderBy == 'dateOfPayment' || 
                $orderBy == 'paymentMethod' || 
                $orderBy == 'paid')
            {
                $orderBy = 'ORDER BY d.'.$orderBy;
            }else if($orderBy == 'consumer'){
                $orderBy = 'ORDER BY c.name';
            }else{
                $orderBy = '';
            }
        }
        if($sort!='')
        {
            if(($sort != 'ASC' || $sort != 'DESC') && $orderBy == '')
            {
                $sort = '';
            }
        }

        $filters = $type.$from.$to.$search.$orderBy.' '.$sort;

        $query = $this->_em->createQuery(
            "
            SELECT d
            FROM ApiBundle:Document d
            JOIN d.consumer c
            WHERE d.userId = :userId
            ".$filters
        );

        $query->setParameter('userId', $userId);

        return $query;
    }

    public function createFindLastDocumentNumber(int $userId, $type)
    {
        $query = $this->_em->createQuery(
            "
            SELECT d.number
            FROM ApiBundle:Document d
            WHERE d.userId = :userId
            AND d.type = :type
            ORDER BY d.number DESC
            "
        );

        $query->setParameter('userId', $userId);
        $query->setParameter('type', $type);
        $query->setMaxResults(1);

        return $query;
    }
}