<?php

namespace ApiBundle\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\DateTimeType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;

class ConsumerType extends AbstractType
{
    /**
     * @param FormBuilderInterface $builder
     * @param array $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('company', TextType::class)
            ->add('name', TextType::class)
            ->add('firstName', TextType::class)
            ->add('lastName', TextType::class)
            ->add('nip', TextType::class)
            ->add('pesel', TextType::class)
            ->add('phone', TextType::class)
            ->add('email', TextType::class)
            ->add('www', TextType::class)
            ->add('bank', TextType::class)
            ->add('bankAccount', TextType::class)
            ->add('street', TextType::class)
            ->add('buildNumber', TextType::class)
            ->add('apartmentNumber', TextType::class)
            ->add('place', TextType::class)
            ->add('postalCode', TextType::class)
            ->add('post', TextType::class)
            ->add('notes', TextareaType::class)
        ;
    }
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => 'ApiBundle\Entity\Consumer',
        ]);
    }
    public function getName()
    {
        return 'consumer';
    }
}