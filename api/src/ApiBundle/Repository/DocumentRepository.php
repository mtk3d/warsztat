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
    private function filters(string $type, string $from, string $to, string $search, string $orderBy, string $sort)
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
            ."' OR c.name LIKE '".$searchStr."')";
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
            if(($sort == 'ASC' || $sort == 'DESC') && $orderBy != '')
            {
                $sort = $sort;
            }else{
                $sort = '';
            }
        }

        $filter = $type.$from.$to.$search.$orderBy.' '.$sort;
        return $filter;
    }

    public function createFindOneByIdQuery(int $id, int $userId)
    {
        $query = $this->_em->createQuery(
            "
            SELECT d.id, 
                d.number,
                d.type,
                d.date, 
                d.dateOfPayment, 
                d.paymentMethod, 
                d.paid,
                d.netto,
                d.brutto,
                d.vat,
                d.vatSum,
                d.place,
                c.id as consumerId
            FROM ApiBundle:Document d
            LEFT JOIN ApiBundle\Entity\Consumer c
            WITH d.consumerId = c.id
            WHERE d.id = :id
            AND d.userId = :userId
            "
        );

        $query->setParameter('id', $id);
        $query->setParameter('userId', $userId);

        return $query;
    }

    public function createUpdateQuery(int $id, int $userId)
    {
        $query = $this->_em->createQuery(
            "
            SELECT d
            FROM ApiBundle:Document d
            WHERE d.id = :id
            AND d.userId = :userId
            "
        );

        $query->setParameter('id', $id);
        $query->setParameter('userId', $userId);

        return $query;
    }

    public function createFindByConsumerIdQuery(int $consumerId, int $userId, string $type, string $from, string $to, string $search, string $orderBy, string $sort)
    {
        $filters = $this->filters($type, $from, $to, $search, $orderBy, $sort);

        $query = $this->_em->createQuery(
            "
            SELECT d.id, 
                d.number, 
                d.type, 
                d.date, 
                d.dateOfPayment, 
                d.paymentMethod, 
                d.paid,
                c.id as consumerId, 
                c.name as consumerName
            FROM ApiBundle:Document d
            LEFT JOIN ApiBundle\Entity\Consumer c
            WITH d.consumerId = c.id
            WHERE d.consumerId = :consumerId
            AND d.userId = :userId
            ".$filters
        );

        $query->setParameter('consumerId', $consumerId);
        $query->setParameter('userId', $userId);

        return $query;
    }

    public function createFindAllQuery(int $userId, string $type, string $from, string $to, string $search, string $orderBy, string $sort)
    {
        $filters = $this->filters($type, $from, $to, $search, $orderBy, $sort);

        $query = $this->_em->createQuery(
            "
            SELECT d.id, 
                d.number, 
                d.type, 
                d.date, 
                d.dateOfPayment, 
                d.paymentMethod, 
                d.paid,
                c.id as consumerId, 
                c.name as consumerName
            FROM ApiBundle:Document d
            LEFT JOIN ApiBundle\Entity\Consumer c
            WITH d.consumerId = c.id
            WHERE d.userId = :userId
            ".$filters
        );

        $query->setParameter('userId', $userId);

        return $query;
    }

    public function createFindLastDocumentNumber(int $userId, $type, $date)
    {
        $query = $this->_em->createQuery(
            "
            SELECT d.number
            FROM ApiBundle:Document d
            WHERE d.userId = :userId
            AND d.type = :type
            AND d.date <= :date
            ORDER BY d.id DESC
            "
        );

        $query->setParameter('userId', $userId);
        $query->setParameter('type', $type);
        $query->setParameter('date', $date);
        $query->setMaxResults(1);

        return $query;
    }
}