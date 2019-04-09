import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CompilerFactory, Compiler, COMPILER_OPTIONS } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IbcommonLibModule} from 'ibcommon-lib';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {CoreModule} from './core/core.module';
import { JitCompilerFactory } from '@angular/platform-browser-dynamic';


// plugins
export function createCompiler(fn: CompilerFactory): Compiler {
  return fn.createCompiler();
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IbcommonLibModule,
    BrowserAnimationsModule,
    CoreModule
  ],
  providers: [{
    provide: COMPILER_OPTIONS,
    useValue: {},
    multi: true
  },
  {
    provide: CompilerFactory,
    useClass: JitCompilerFactory,
    deps: [COMPILER_OPTIONS]
  },
  {
    provide: Compiler,
    useFactory: createCompiler,
    deps: [CompilerFactory]
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
