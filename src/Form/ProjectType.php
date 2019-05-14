<?php

declare(strict_types=1);

namespace App\Form;

use App\Entity\Project;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\DateTimeType;
use Symfony\Component\Form\Extension\Core\Type\DateType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

final class ProjectType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $dateWidgetOptions = [
            'widget' => 'single_text',
            'input' => 'datetime_immutable',
        ];

        $builder
            ->add('subject', TextType::class)
            ->add('description', TextType::class)
            ->add('start_date', DateType::class, $dateWidgetOptions)
            ->add('created_on', DateTimeType::class, $dateWidgetOptions)
            ->add('updated_on', DateTimeType::class, $dateWidgetOptions);
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Project::class,
            'allow_extra_fields' => true,
            'csrf_protection' => false,
        ]);
    }
}
