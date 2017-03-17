<?php

namespace ApiBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * DocumentPosition
 *
 * @ORM\Table(name="document_position")
 * @ORM\Entity(repositoryClass="ApiBundle\Repository\DocumentPositionRepository")
 */
class DocumentPosition
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
     * @ORM\Column(name="service_id", type="integer", nullable=true)
     */
    private $serviceId;

    /**
     * @var int
     *
     * @ORM\Column(name="store_id", type="integer", nullable=true)
     */
    private $storeId;

    /**
     * @var int
     *
     * @ORM\Column(name="document_id", type="integer")
     */
    private $documentId;

    /**
     * @var string
     *
     * @ORM\Column(name="name", type="string", length=255)
     */
    private $name;

    /**
     * @var float
     *
     * @ORM\Column(name="netto", type="float")
     */
    private $netto;

    /**
     * @var float
     *
     * @ORM\Column(name="brutto", type="float")
     */
    private $brutto;

    /**
     * @var float
     *
     * @ORM\Column(name="vat", type="float")
     */
    private $vat;

    /**
     * @var float
     *
     * @ORM\Column(name="vat_sum", type="float")
     */
    private $vatSum;

    /**
     * @var float
     *
     * @ORM\Column(name="quantity", type="float")
     */
    private $quantity;

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
     * @return DocumentPosition
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
     * Set serviceId
     *
     * @param integer $serviceId
     *
     * @return DocumentPosition
     */
    public function setServiceId($serviceId)
    {
        $this->serviceId = $serviceId;

        return $this;
    }

    /**
     * Get serviceId
     *
     * @return int
     */
    public function getServiceId()
    {
        return $this->serviceId;
    }

    /**
     * Set storeId
     *
     * @param integer $storeId
     *
     * @return DocumentPosition
     */
    public function setStoreId($storeId)
    {
        $this->storeId = $storeId;

        return $this;
    }

    /**
     * Get storeId
     *
     * @return int
     */
    public function getStoreId()
    {
        return $this->storeId;
    }

    /**
     * Set documentId
     *
     * @param integer $documentId
     *
     * @return DocumentPosition
     */
    public function setDocumentId($documentId)
    {
        $this->documentId = $documentId;

        return $this;
    }

    /**
     * Get documentId
     *
     * @return int
     */
    public function getDocumentId()
    {
        return $this->documentId;
    }

    /**
     * Set name
     *
     * @param string $name
     *
     * @return DocumentPosition
     */
    public function setName($name)
    {
        $this->name = $name;

        return $this;
    }

    /**
     * Get name
     *
     * @return string
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * Set netto
     *
     * @param float $netto
     *
     * @return DocumentPosition
     */
    public function setNetto($netto)
    {
        $this->netto = $netto;

        return $this;
    }

    /**
     * Get netto
     *
     * @return float
     */
    public function getNetto()
    {
        return $this->netto;
    }

    /**
     * Set brutto
     *
     * @param float $brutto
     *
     * @return DocumentPosition
     */
    public function setBrutto($brutto)
    {
        $this->brutto = $brutto;

        return $this;
    }

    /**
     * Get brutto
     *
     * @return float
     */
    public function getBrutto()
    {
        return $this->brutto;
    }

    /**
     * Set vat
     *
     * @param float $vat
     *
     * @return DocumentPosition
     */
    public function setVat($vat)
    {
        $this->vat = $vat;

        return $this;
    }

    /**
     * Get vat
     *
     * @return float
     */
    public function getVat()
    {
        return $this->vat;
    }

    /**
     * Set vatSum
     *
     * @param float $vatSum
     *
     * @return DocumentPosition
     */
    public function setVatSum($vatSum)
    {
        $this->vatSum = $vatSum;

        return $this;
    }

    /**
     * Get vatSum
     *
     * @return float
     */
    public function getVatSum()
    {
        return $this->vatSum;
    }

    /**
     * Set quantity
     *
     * @param float $quantity
     *
     * @return DocumentPosition
     */
    public function setQuantity($quantity)
    {
        $this->quantity = $quantity;

        return $this;
    }

    /**
     * Get quantity
     *
     * @return float
     */
    public function getQuantity()
    {
        return $this->quantity;
    }

    /**
     * Set createdAt
     *
     * @param \DateTime $createdAt
     *
     * @return DocumentPosition
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
     * @return DocumentPosition
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

