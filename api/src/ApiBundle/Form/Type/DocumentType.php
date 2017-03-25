<?php

namespace ApiBundle\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\DateTimeType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;

class DocumentType extends AbstractType
{
    /**
     * @param FormBuilderInterface $builder
     * @param array $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('consumerId', TextType::class)
            ->add('type', TextType::class)
            ->add('number', TextType::class)
            ->add('date', DateTimeType::class, ['widget' => 'single_text'])
            ->add('dateOfPayment', DateTimeType::class, ['widget' => 'single_text'])
            ->add('paymentMethod', TextType::class)
            ->add('paid', CheckboxType::class)
            ->add('bank', TextType::class)
            ->add('bankAccount', TextType::class)
            ->add('place', TextType::class)
            ->add('vat', TextType::class)
            ->add('netto', TextType::class)
            ->add('brutto', TextType::class)
            ->add('vatSum', TextType::class)
            ->add('notes', TextareaType::class)
        ;
    }
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => 'ApiBundle\Entity\Document',
        ]);
    }
    public function getName()
    {
        return 'document';
    }
}