<?php

namespace ApiBundle\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\DateTimeType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;

class TireType extends AbstractType
{
    /**
     * @param FormBuilderInterface $builder
     * @param array $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('consumerId', TextType::class)
            ->add('vehicleId', TextType::class)
            ->add('number', TextType::class)
            ->add('size', TextType::class)
            ->add('producer', TextType::class)
            ->add('type', TextType::class)
            ->add('rim', TextType::class)
            ->add('notes', TextareaType::class)
        ;
    }
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => 'ApiBundle\Entity\Tire',
        ]);
    }
    public function getName()
    {
        return 'tire';
    }
}