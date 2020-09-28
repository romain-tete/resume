import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { ContactEffects } from './contact.effects';
import { contactReducer } from './contact.reducer';
import { ResourcesEffects } from './resources.effects';
import { resourcesReducer } from './resources.reducer';

@NgModule({
  imports: [
    StoreModule.forFeature('experiences', {
      resources: resourcesReducer,
      contact: contactReducer,
    }),
    EffectsModule.forFeature([ResourcesEffects, ContactEffects]),
  ],
})
export class ExperiencesStateModule {}
