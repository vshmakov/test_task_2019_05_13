<?php

declare(strict_types=1);

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\DateFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
 * @ApiResource(
 *     attributes={"order"={"updatedOn": "desc"}},
 *     itemOperations={"GET"}
 * )
 * @ApiFilter(SearchFilter::class, properties={"subject": "ipartial"})
 * @ApiFilter(DateFilter::class, properties={"updatedOn"})
 */
class Project
{
    /**
     * @var int|null
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="bigint")
     */
    private $id;

    /**
     * @var string|null
     * @ORM\Column
     */
    private $subject;

    /**
     * @var string|null
     * @ORM\Column(length=4096)
     */
    private $description;

    /**
     * @var \DateTimeInterface|null
     * @ORM\Column(type="date_immutable")
     */
    private $startDate;

    /**
     * @var \DateTimeInterface
     * @ORM\Column(type="datetime_immutable")
     */
    private $createdOn;

    /**
     * @var \DateTimeInterface
     * @ORM\Column(type="datetime_immutable")
     */
    private $updatedOn;

    public function __construct()
    {
        $this->createdOn = new \DateTimeImmutable();
        $this->updatedOn = new \DateTimeImmutable();
    }

    public function getId()
    {
        return $this->id;
    }

    public function setId(?int $id): void
    {
        $this->id = $id;
    }

    public function getSubject(): ?string
    {
        return $this->subject;
    }

    public function setSubject(?string $subject): void
    {
        $this->subject = $subject;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): void
    {
        $this->description = $description;
    }

    public function getStartDate(): ?\DateTimeInterface
    {
        return $this->startDate;
    }

    public function setStartDate(?\DateTimeInterface $startDate): void
    {
        $this->startDate = $startDate;
    }

    public function getCreatedOn(): \DateTimeInterface
    {
        return $this->createdOn;
    }

    public function setCreatedOn(\DateTimeInterface $createdOn): void
    {
        $this->createdOn = $createdOn;
    }

    public function getUpdatedOn(): \DateTimeInterface
    {
        return $this->updatedOn;
    }

    public function setUpdatedOn(\DateTimeInterface $updatedOn): void
    {
        $this->updatedOn = $updatedOn;
    }
}
