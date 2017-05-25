<?php

namespace ApiBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * Document
 *
 * @ORM\Table(name="document")
 * @ORM\Entity(repositoryClass="ApiBundle\Repository\DocumentRepository")
 */
class Document
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
     * @Assert\Type("integer")
     */
    private $userId;

    /**
     * @var int
     *
     * @ORM\Column(name="consumer_id", type="integer")
     * @Assert\NotBlank()
     * @Assert\NotNull()
     * @Assert\Type("digit")
     */
    private $consumerId;

    /**
     * @var string
     *
     * @ORM\Column(name="type", type="string", length=255)
     * @Assert\NotBlank()
     * @Assert\NotNull()
     * @Assert\Choice({"FV", "Rachunek"})
     */
    private $type;

    /**
     * @var string
     *
     * @ORM\Column(name="number", type="string", length=255)
     * @Assert\Regex(
     *     pattern="/^.{1,2}[[:space:]][0-9][0-9][0-9]\/[0-9][0-9]\/[0-9][0-9][0-9][0-9]$/",
     *     match=true,
     *     message="Wrong number format"
     * )
     */
    private $number;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="date", type="datetime")
     * @Assert\NotBlank()
     * @Assert\NotNull()
     * @Assert\DateTime()
     */
    private $date;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="date_of_payment", type="datetime")
     * @Assert\NotBlank()
     * @Assert\NotNull()
     * @Assert\DateTime()
     */
    private $dateOfPayment;

    /**
     * @var string
     *
     * @ORM\Column(name="payment_method", type="string", length=255)
     * @Assert\NotBlank()
     * @Assert\NotNull()
     * @Assert\Choice({"Gotówka", "Karta", "Przelew"})
     */
    private $paymentMethod;

    /**
     * @var bool
     *
     * @ORM\Column(name="paid", type="boolean")
     * @Assert\Type("boolean")
     */
    private $paid;

    /**
     * @var string
     *
     * @ORM\Column(name="bank", type="string", length=255, nullable=true)
     */
    private $bank;

    /**
     * @var string
     *
     * @ORM\Column(name="bank_account", type="string", length=255, nullable=true, unique=true)
     * @Assert\Type("digit")
     */
    private $bankAccount;

    /**
     * @var string
     *
     * @ORM\Column(name="place", type="string", length=255, nullable=true)
     */
    private $place;

    /**
     * @var float
     *
     * @ORM\Column(name="vat", type="float")
     * @Assert\NotBlank()
     * @Assert\Type("digit")
     */
    private $vat;

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
     * @Assert\DateTime()
     */
    private $createdAt;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="updated_at", type="datetime")
     * @Assert\DateTime()
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
     * @return Document
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
     * @return Document
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
     * Set type
     *
     * @param string $type
     *
     * @return Document
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
     * Set number
     *
     * @param string $number
     *
     * @return Document
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
     * Set date
     *
     * @param \DateTime $date
     *
     * @return Document
     */
    public function setDate($date)
    {
        $this->date = $date;

        return $this;
    }

    /**
     * Get date
     *
     * @return \DateTime
     */
    public function getDate()
    {
        return $this->date;
    }

    /**
     * Set dateOfPayment
     *
     * @param \DateTime $dateOfPayment
     *
     * @return Document
     */
    public function setDateOfPayment($dateOfPayment)
    {
        $this->dateOfPayment = $dateOfPayment;

        return $this;
    }

    /**
     * Get dateOfPayment
     *
     * @return \DateTime
     */
    public function getDateOfPayment()
    {
        return $this->dateOfPayment;
    }

    /**
     * Set paymentMethod
     *
     * @param string $paymentMethod
     *
     * @return Document
     */
    public function setPaymentMethod($paymentMethod)
    {
        $this->paymentMethod = $paymentMethod;

        return $this;
    }

    /**
     * Get paymentMethod
     *
     * @return string
     */
    public function getPaymentMethod()
    {
        return $this->paymentMethod;
    }

    /**
     * Set paid
     *
     * @param boolean $paid
     *
     * @return Document
     */
    public function setPaid($paid)
    {
        $this->paid = $paid;

        return $this;
    }

    /**
     * Get paid
     *
     * @return bool
     */
    public function getPaid()
    {
        return $this->paid;
    }

    /**
     * Set bank
     *
     * @param string $bank
     *
     * @return Document
     */
    public function setBank($bank)
    {
        $this->bank = $bank;

        return $this;
    }

    /**
     * Get bank
     *
     * @return string
     */
    public function getBank()
    {
        return $this->bank;
    }

    /**
     * Set bankAccount
     *
     * @param string $bankAccount
     *
     * @return Document
     */
    public function setBankAccount($bankAccount)
    {
        $this->bankAccount = $bankAccount;

        return $this;
    }

    /**
     * Get bankAccount
     *
     * @return string
     */
    public function getBankAccount()
    {
        return $this->bankAccount;
    }

    /**
     * Set place
     *
     * @param string $place
     *
     * @return Document
     */
    public function setPlace($place)
    {
        $this->place = $place;

        return $this;
    }

    /**
     * Get place
     *
     * @return string
     */
    public function getPlace()
    {
        return $this->place;
    }

    /**
     * Set vat
     *
     * @param float $vat
     *
     * @return Document
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
     * Set notes
     *
     * @param string $notes
     *
     * @return Document
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
     * @return Document
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
     * @return Document
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

    /**
     * Set user
     *
     * @param \ApiBundle\Entity\User $user
     *
     * @return Document
     */
    public function setUser(\ApiBundle\Entity\User $user = null)
    {
        $this->user = $user;

        return $this;
    }

    /**
     * Get user
     *
     * @return \ApiBundle\Entity\User
     */
    public function getUser()
    {
        return $this->user;
    }
}
