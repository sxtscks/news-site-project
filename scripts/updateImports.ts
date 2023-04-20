import { Project } from 'ts-morph';

const project = new Project({});

project.addSourceFilesAtPaths('src/**/*.ts');
project.addSourceFilesAtPaths('src/**/*.tsx');

const files = project.getSourceFiles();

const isAbsolute = (path: string) => {
  const layers = ['app', 'shared', 'widgets', 'features', 'entities', 'pages'];
  return layers.some((layer) => path.startsWith(layer));
};

files.forEach((file) => {
  const importDeclarations = file.getImportDeclarations();
  importDeclarations.forEach((declaration) => {
    const value = declaration.getModuleSpecifierValue();
    if (isAbsolute(value)) {
      declaration.setModuleSpecifier(`@/${value}`);
    }
  });
});

project.save();
