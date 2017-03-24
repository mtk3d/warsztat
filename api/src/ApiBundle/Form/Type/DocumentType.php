<?php

namespace ApiBundle\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

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
            ->add('date', TextType::class)
            ->add('dateOfPayment', TextType::class)
            ->add('paymentMethod', TextType::class)
            ->add('paid', TextType::class)
            ->add('bank', TextType::class)
            ->add('bankAccount', TextType::class)
            ->add('place', TextType::class)
            ->add('vat', TextType::class)
            ->add('netto', TextType::class)
            ->add('brutto', TextType::class)
            ->add('vatSum', TextType::class)
            ->add('notes', TextType::class)
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
        return 'blog_post';
    }
}