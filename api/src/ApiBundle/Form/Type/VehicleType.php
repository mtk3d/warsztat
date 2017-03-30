<?php

namespace ApiBundle\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\DateTimeType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;

class VehicleType extends AbstractType
{
    /**
     * @param FormBuilderInterface $builder
     * @param array $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('consumerId', TextType::class)
            ->add('registrationNumber', TextType::class)
            ->add('model', TextType::class)
            ->add('mark', TextType::class)
            ->add('engine', TextType::class)
            ->add('notes', TextareaType::class)
        ;
    }
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => 'ApiBundle\Entity\Vehicle',
        ]);
    }
    public function getName()
    {
        return 'vehicle';
    }
}