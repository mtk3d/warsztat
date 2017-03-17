<?php

namespace ApiBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Tire
 *
 * @ORM\Table(name="tire")
 * @ORM\Entity(repositoryClass="ApiBundle\Repository\TireRepository")
 */
class Tire
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
     * @var int
     *
     * @ORM\Column(name="consumer_id", type="integer")
     */
    private $consumerId;

    /**
     * @var int
     *
     * @ORM\Column(name="vehicle_id", type="integer", nullable=true)
     */
    private $vehicleId;

    /**
     * @var string
     *
     * @ORM\Column(name="number", type="string", length=255)
     */
    private $number;

    /**
     * @var string
     *
     * @ORM\Column(name="size", type="string", length=255, nullable=true)
     */
    private $size;

    /**
     * @var string
     *
     * @ORM\Column(name="producer", type="string", length=255, nullable=true)
     */
    private $producer;

    /**
     * @var string
     *
     * @ORM\Column(name="type", type="string", length=255, nullable=true)
     */
    private $type;

    /**
     * @var string
     *
     * @ORM\Column(name="rim", type="string", length=255, nullable=true)
     */
    private $rim;

    /**
     * @var string
     *
     * @ORM\Column(name="notes", type="text", nullable=true)
     */
    private $notes;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="created_at", type="datetime")
     */
    private $createdAt;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="updated_at", type="datetime")
     */
    private $updatedAt;


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
     * @return Tire
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
     * Set consumerId
     *
     * @param integer $consumerId
     *
     * @return Tire
     */
    public function setConsumerId($consumerId)
    {
        $this->consumerId = $consumerId;

        return $this;
    }

    /**
     * Get consumerId
     *
     * @return int
     */
    public function getConsumerId()
    {
        return $this->consumerId;
    }

    /**
     * Set vehicleId
     *
     * @param integer $vehicleId
     *
     * @return Tire
     */
    public function setVehicleId($vehicleId)
    {
        $this->vehicleId = $vehicleId;

        return $this;
    }

    /**
     * Get vehicleId
     *
     * @return int
     */
    public function getVehicleId()
    {
        return $this->vehicleId;
    }

    /**
     * Set number
     *
     * @param string $number
     *
     * @return Tire
     */
    public function setNumber($number)
    {
        $this->number = $number;

        return $this;
    }

    /**
     * Get number
     *
     * @return string
     */
    public function getNumber()
    {
        return $this->number;
    }

    /**
     * Set size
     *
     * @param string $size
     *
     * @return Tire
     */
    public function setSize($size)
    {
        $this->size = $size;

        return $this;
    }

    /**
     * Get size
     *
     * @return string
     */
    public function getSize()
    {
        return $this->size;
    }

    /**
     * Set producer
     *
     * @param string $producer
     *
     * @return Tire
     */
    public function setProducer($producer)
    {
        $this->producer = $producer;

        return $this;
    }

    /**
     * Get producer
     *
     * @return string
     */
    public function getProducer()
    {
        return $this->producer;
    }

    /**
     * Set type
     *
     * @param string $type
     *
     * @return Tire
     */
    public function setType($type)
    {
        $this->type = $type;

        return $this;
    }

    /**
     * Get type
     *
     * @return string
     */
    public function getType()
    {
        return $this->type;
    }

    /**
     * Set rim
     *
     * @param string $rim
     *
     * @return Tire
     */
    public function setRim($rim)
    {
        $this->rim = $rim;

        return $this;
    }

    /**
     * Get rim
     *
     * @return string
     */
    public function getRim()
    {
        return $this->rim;
    }

    /**
     * Set notes
     *
     * @param string $notes
     *
     * @return Tire
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

    /**
     * Set createdAt
     *
     * @param \DateTime $createdAt
     *
     * @return Tire
     */
    public function setCreatedAt($createdAt)
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    /**
     * Get createdAt
     *
     * @return \DateTime
     */
    public function getCreatedAt()
    {
        return $this->createdAt;
    }

    /**
     * Set updatedAt
     *
     * @param \DateTime $updatedAt
     *
     * @return Tire
     */
    public function setUpdatedAt($updatedAt)
    {
        $this->updatedAt = $updatedAt;

        return $this;
    }

    /**
     * Get updatedAt
     *
     * @return \DateTime
     */
    public function getUpdatedAt()
    {
        return $this->updatedAt;
    }
}

