<?php

namespace ApiBundle\Repository;

/**
 * StoreRepository
 *
 * This class was generated by the Doctrine ORM. Add your own custom
 * repository methods below.
 */
class StoreRepository extends \Doctrine\ORM\EntityRepository
{
    public function createFindOneByIdQuery(int $id, int $userId)
    {
        $query = $this->_em->createQuery(
            "
            SELECT d.id,
                d.name,
                d.quantity,
                d.unit,
                d.netto,
                d.vat,
                d.vatSum,
                d.brutto
            FROM ApiBundle:Store d
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
            FROM ApiBundle:Store d
            WHERE d.id = :id
            AND d.userId = :userId
            "
        );

        $query->setParameter('id', $id);
        $query->setParameter('userId', $userId);

        return $query;
    }

    public function createFindAllQuery(int $userId, string $searchStr, string $orderBy, string $sort)
    {
        if($orderBy!='')
        {
            if($orderBy == 'name' || 
                $orderBy == 'quantity' || 
                $orderBy == 'netto' || 
                $orderBy == 'vat' || 
                $orderBy == 'vatSum' || 
                $orderBy == 'brutto')
            {
                $orderBy = 'ORDER BY d.'.$orderBy;
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

        $sorting = $orderBy.' '.$sort;

        $query = $this->_em->createQuery(
            "
            SELECT d.id,
                d.name,
                d.quantity,
                d.unit,
                d.netto,
                d.vat,
                d.vatSum,
                d.brutto
            FROM ApiBundle:Store d
            WHERE d.userId = :userId
            AND (d.name LIKE :searchStr
            OR d.quantity LIKE :searchStr
            OR d.unit LIKE :searchStr
            OR d.netto LIKE :searchStr
            OR d.vat LIKE :searchStr
            OR d.vatSum LIKE :searchStr
            OR d.brutto LIKE :searchStr)
            ".$sorting
        );

        $query->setParameter('userId', $userId);
        $query->setParameter('searchStr', '%'.$searchStr.'%');

        return $query;
    }
}
