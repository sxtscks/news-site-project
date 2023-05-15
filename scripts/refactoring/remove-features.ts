import { Node, Project, SyntaxKind } from 'ts-morph';

const removedFeatureName = process.argv[2]; // название фичи
const featureState = process.argv[3]; // включить/выключить фичу

if (!removedFeatureName) {
  throw new Error('Укажите название фичефлага');
}

if (!featureState) {
  throw new Error('Укажите состояние фичи');
}

const project = new Project({});

project.addSourceFilesAtPaths('src/**/*.ts');
project.addSourceFilesAtPaths('src/**/*.tsx');

const files = project.getSourceFiles();

const isToggleFunction = (node: Node) => {
  let isToggleFeatures = false;

  node.forEachChild((child) => {
    if (
      child.isKind(SyntaxKind.Identifier) &&
      child.getText() === 'toggleFeatures'
    ) {
      isToggleFeatures = true;
    }
  });
  return isToggleFeatures;
};

files.forEach((file) => {
  file.forEachDescendant((node) => {
    if (node.isKind(SyntaxKind.CallExpression) && isToggleFunction(node)) {
      const objectOptions = node.getFirstDescendantByKind(
        SyntaxKind.ObjectLiteralExpression
      );

      if (!objectOptions) return;

      const nameProperty = objectOptions.getProperty('name');
      const onProperty = objectOptions.getProperty('on');
      const offProperty = objectOptions.getProperty('off');

      const onFunction = onProperty?.getFirstDescendantByKind(
        SyntaxKind.ArrowFunction
      );
      const offFunction = offProperty?.getFirstDescendantByKind(
        SyntaxKind.ArrowFunction
      );
      const featureName = nameProperty
        ?.getFirstDescendantByKind(SyntaxKind.StringLiteral)
        ?.getText()
        ?.slice(1, -1);

      if (featureName !== removedFeatureName) return;

      if (featureState === 'on') {
        node.replaceWithText(onFunction?.getBody().getText() ?? '');
      }

      if (featureState === 'off') {
        node.replaceWithText(offFunction?.getBody().getText() ?? '');
      }
    }
  });
});

project.save();
