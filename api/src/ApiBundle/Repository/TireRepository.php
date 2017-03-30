<?php

namespace ApiBundle\Repository;

/**
 * TireRepository
 *
 * This class was generated by the Doctrine ORM. Add your own custom
 * repository methods below.
 */
class TireRepository extends \Doctrine\ORM\EntityRepository
{
	public function createFindOneByIdQuery(int $id, int $userId)
    {
        $query = $this->_em->createQuery(
            "
            SELECT d
            FROM ApiBundle:Tire d
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
            FROM ApiBundle:Tire d
            WHERE d.consumerId = :consumerId
            AND d.userId = :userId
            "
        );

        $query->setParameter('consumerId', $consumerId);
        $query->setParameter('userId', $userId);

        return $query;
    }

    public function createFindAllQuery(int $userId)
    {
        $query = $this->_em->createQuery(
            "
            SELECT d
            FROM ApiBundle:Tire d
            WHERE d.userId = :userId
            "
        );

        $query->setParameter('userId', $userId);

        return $query;
    }
    
}
