import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { PagesModule } from './feature/pages/pages.module';
import { AuthService } from './core/auth.service';
import { StoreModule } from '@ngrx/store';
import { IRootState, loadLatestReducer } from './+store';
import { EffectsModule } from '@ngrx/effects';
import { Effects } from './+store/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CoreModule.forRoot(),
    PagesModule,
    StoreModule.forRoot<IRootState>({
      latestProducts: loadLatestReducer,
    }),
    EffectsModule.forRoot([Effects]),
    StoreDevtoolsModule.instrument({ logOnly: environment.production }),
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: (authService: AuthService) => {
        return () => authService.authenticate();
      },
      deps: [AuthService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
