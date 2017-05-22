<?php

namespace ApiBundle\Repository;

/**
 * VehicleRepository
 *
 * This class was generated by the Doctrine ORM. Add your own custom
 * repository methods below.
 */
class VehicleRepository extends \Doctrine\ORM\EntityRepository
{
    public function createFindOneByIdQuery(int $id, int $userId)
    {
        $query = $this->_em->createQuery(
            "
            SELECT d.id,
                d.consumerId,
                d.registrationNumber,
                d.model,
                d.mark,
                d.engine,
                d.notes
            FROM ApiBundle:Vehicle d
            WHERE d.id = :id
            AND d.userId = :userId
            "
        );

        $query->setParameter('id', $id);
        $query->setParameter('userId', $userId);

        return $query;
    }

    public function createUpdateByIdQuery(int $id, int $userId)
    {
        $query = $this->_em->createQuery(
            "
            SELECT d
            FROM ApiBundle:Vehicle d
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
            SELECT d.id,
                d.consumerId,
                d.registrationNumber,
                d.model,
                d.mark,
                d.engine,
                d.notes
            FROM ApiBundle:Vehicle d
            WHERE d.consumerId = :consumerId
            AND d.userId = :userId
            "
        );

        $query->setParameter('consumerId', $consumerId);
        $query->setParameter('userId', $userId);

        return $query;
    }

    public function createFindAllQuery(int $userId, string $searchStr, string $orderBy, string $sort)
    {
        if($orderBy!='')
        {
            if($orderBy == 'registrationNumber' || 
                $orderBy == 'model' || 
                $orderBy == 'mark' || 
                $orderBy == 'engine')
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
                d.consumerId,
                d.registrationNumber,
                d.model,
                d.mark,
                d.engine,
                d.notes
            FROM ApiBundle:Vehicle d
            WHERE d.userId = :userId
            AND (d.registrationNumber LIKE :searchStr
            OR d.model LIKE :searchStr
            OR d.mark LIKE :searchStr
            OR d.engine LIKE :searchStr
            OR d.notes LIKE :searchStr)
            ".$sorting
        );

        $query->setParameter('userId', $userId);
        $query->setParameter('searchStr', '%'.$searchStr.'%');

        return $query;
    }
    
}
