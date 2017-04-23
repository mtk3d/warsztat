<?php

namespace ApiBundle\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\DateTimeType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;

class ServiceOrderPositionType extends AbstractType
{
    /**
     * @param FormBuilderInterface $builder
     * @param array $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('orderId', TextType::class)
            ->add('serviceId', TextType::class)
            ->add('name', TextType::class)
            ->add('netto', TextType::class)
            ->add('brutto', TextType::class)
            ->add('vat', TextType::class)
            ->add('vatSum', TextType::class)
            ->add('employeeId', TextType::class)
            ->add('quantity', TextType::class)
            ->add('completed', TextType::class)
        ;
    }
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => 'ApiBundle\Entity\ServiceOrderPosition',
        ]);
    }
    public function getName()
    {
        return 'service_order_position_type';
    }
}