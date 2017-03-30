<?php

namespace ApiBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * CarRent
 *
 * @ORM\Table(name="car_rent")
 * @ORM\Entity(repositoryClass="ApiBundle\Repository\CarRentRepository")
 */
class CarRent
{
    /**
     * @var int
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @var int
     *
     * @ORM\Column(name="user_id", type="integer")
     */
    private $userId;

    /**
     * @var string
     *
     * @ORM\Column(name="registration_number", type="string", length=255)
     */
    private $registrationNumber;

    /**
     * @var string
     *
     * @ORM\Column(name="course", type="string", length=255, nullable=true)
     */
    private $course;

    /**
     * @var bool
     *
     * @ORM\Column(name="loan", type="boolean")
     */
    private $loan;

    /**
     * @var string
     *
     * @ORM\Column(name="notes", type="text")
     */
    private $notes;


    /**
     * Get id
     *
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set userId
     *
     * @param integer $userId
     *
     * @return CarRent
     */
    public function setUserId($userId)
    {
        $this->userId = $userId;

        return $this;
    }

    /**
     * Get userId
     *
     * @return int
     */
    public function getUserId()
    {
        return $this->userId;
    }

    /**
     * Set registrationNumber
     *
     * @param string $registrationNumber
     *
     * @return CarRent
     */
    public function setRegistrationNumber($registrationNumber)
    {
        $this->registrationNumber = $registrationNumber;

        return $this;
    }

    /**
     * Get registrationNumber
     *
     * @return string
     */
    public function getRegistrationNumber()
    {
        return $this->registrationNumber;
    }

    /**
     * Set course
     *
     * @param string $course
     *
     * @return CarRent
     */
    public function setCourse($course)
    {
        $this->course = $course;

        return $this;
    }

    /**
     * Get course
     *
     * @return string
     */
    public function getCourse()
    {
        return $this->course;
    }

    /**
     * Set loan
     *
     * @param boolean $loan
     *
     * @return CarRent
     */
    public function setLoan($loan)
    {
        $this->loan = $loan;

        return $this;
    }

    /**
     * Get loan
     *
     * @return bool
     */
    public function getLoan()
    {
        return $this->loan;
    }

    /**
     * Set notes
     *
     * @param string $notes
     *
     * @return CarRent
     */
    public function setNotes($notes)
    {
        $this->notes = $notes;

        return $this;
    }

    /**
     * Get notes
     *
     * @return string
     */
    public function getNotes()
    {
        return $this->notes;
    }
}
