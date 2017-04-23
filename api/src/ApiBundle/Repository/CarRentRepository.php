<?php

namespace ApiBundle\Repository;

/**
 * CarRentRepository
 *
 * This class was generated by the Doctrine ORM. Add your own custom
 * repository methods below.
 */
class CarRentRepository extends \Doctrine\ORM\EntityRepository
{
    private function filters(string $search, string $orderBy, string $sort)
    {
        if($search!='')
        {
            $searchStr = '%'.$search.'%';
            $search = "AND (d.number LIKE '".$searchStr
            ."' OR d.name LIKE '".$searchStr
            ."' OR c.registrationNumber LIKE '".$searchStr."')";
        }
        if($orderBy!='')
        {
            if($orderBy == 'name' || 
                $orderBy == 'registrationNumber' ||
                $orderBy == 'loan')
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

        $filter = $search.$orderBy.' '.$sort;
        return $filter;
    }

    public function createFindOneByIdQuery(int $id, int $userId)
    {
        $query = $this->_em->createQuery(
            "
            SELECT d.id,
                d.userId,
                d.name,
                d.registrationNumber,
                d.course,
                d.loan,
                d.notes
            FROM ApiBundle:CarRent d
            WHERE d.id = :id
            AND d.userId = :userId
            "
        );

        $query->setParameter('id', $id);
        $query->setParameter('userId', $userId);

        return $query;
    }

    public function createFindAllQuery(int $userId, string $search, string $orderBy, string $sort)
    {
        $filters = $this->filters($search, $orderBy, $sort);

        $query = $this->_em->createQuery(
            "
            SELECT d.id,
                d.userId,
                d.name,
                d.registrationNumber,
                d.loan
            FROM ApiBundle:CarRent d
            WHERE d.userId = :userId
            ".$filters
        );

        $query->setParameter('userId', $userId);

        return $query;
    }

    public function createUpdateQuery(int $id, int $userId)
    {
        $query = $this->_em->createQuery(
            "
            SELECT d
            FROM ApiBundle:CarRent d
            WHERE d.id = :id
            AND d.userId = :userId
            "
        );

        $query->setParameter('id', $id);
        $query->setParameter('userId', $userId);

        return $query;
    }
}
