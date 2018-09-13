import {
  Builder,
  BuilderConfiguration,
  BuilderContext,
  BuildEvent,
} from '@angular-devkit/architect';
import { Observable } from 'rxjs';
import { WebWorkerBuilderSchema } from './schema';
import { virtualFs, resolve } from '@angular-devkit/core';
import { Stats } from 'fs';
import { WebpackBuilder } from '@angular-devkit/build-webpack';
import {
  BrowserBuilder,
  NormalizedBrowserBuilderSchema,
} from '@angular-devkit/build-angular';

export default class WebWorkerBuilder
  implements Builder<WebWorkerBuilderSchema> {
  constructor(private context: BuilderContext) {}

  public run(
    builderConfig: BuilderConfiguration<Partial<WebWorkerBuilderSchema>>,
  ): Observable<BuildEvent> {
    const host = new virtualFs.AliasHost(this.context.host as virtualFs.Host<
      Stats
    >);
    const root = this.context.workspace.root;
    const projectRoot = resolve(root, builderConfig.root);

    const options = builderConfig.options;
    options.scripts = [];
    options.styles = [];

    const webpackBuilder = new WebpackBuilder({ ...this.context, host });
    const browserBuilder = new BrowserBuilder(this.context);

    const webpackConfig = browserBuilder.buildWebpackConfig(
      root,
      projectRoot,
      host,
      options as NormalizedBrowserBuilderSchema,
    );

    webpackConfig.optimization.splitChunks = false;
    webpackConfig.optimization.runtimeChunk = false;

    const plugins = webpackConfig.plugins as Array<Object>;

    plugins.splice(
      plugins.findIndex(x => x.constructor.name === 'IndexHtmlWebpackPlugin'),
      1,
    );

    // plugins.forEach((p: object) => {
    //     console.log(p.constructor.name);
    // });

    return webpackBuilder.runWebpack(webpackConfig);
  }
}
