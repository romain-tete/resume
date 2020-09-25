import { ResourcesEffects } from './resources.effects';
import { EffectsModule } from '@ngrx/effects';
import { resourcesReducer } from './resources.reducer';
import { StoreModule } from '@ngrx/store';
import { NgModule } from '@angular/core';
import { contactReducer } from './contact.reducer';
import { ContactEffects } from './contact.effects';

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
