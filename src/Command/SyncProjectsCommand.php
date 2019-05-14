<?php

declare(strict_types=1);

namespace App\Command;

use App\Entity\Project;
use App\Form\ProjectType;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;
use Symfony\Component\Form\FormFactoryInterface;

final class SyncProjectsCommand extends Command
{
    protected static $defaultName = 'sync-projects';

    /** @var FormFactoryInterface */
    private $formFactory;

    /** @var EntityManagerInterface */
    private $entityManager;

    public function __construct(string $name = null, FormFactoryInterface $formFactory, EntityManagerInterface $entityManager)
    {
        parent::__construct($name);

        $this->formFactory = $formFactory;
        $this->entityManager = $entityManager;
    }

    protected function execute(InputInterface $input, OutputInterface $output): void
    {
        $io = new SymfonyStyle($input, $output);

        $oldProjects = $this->entityManager
            ->getRepository(Project::class)
            ->findAll();

        foreach ($oldProjects as $oldProject) {
            $this->entityManager->remove($oldProject);
        }

        $this->entityManager->flush();

        $data = json_decode(file_get_contents('http://bravik.ru/dev/projects'), true);
        $projects = $data['issues'];

        foreach ($projects as $projectData) {
            $project = new Project();
            $form = $this->formFactory->create(ProjectType::class, $project);
            $form->submit($projectData);
            $this->entityManager->persist($project);
        }

        $this->entityManager->flush();
        $io->success('Projects are synchronized');
    }
}
