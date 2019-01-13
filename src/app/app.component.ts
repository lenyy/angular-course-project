import {Component, OnInit} from '@angular/core';
import {RecipeService} from './recipes/recipe.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [RecipeService]
})
export class AppComponent implements OnInit{
  loadedFeature = 'recipe';

  onNavigate(feature: string) {
    this.loadedFeature = feature;
  }

  ngOnInit(): void {
    firebase.initializeApp({
      apiKey: "AIzaSyChPIf0Dj02qReXRIx5nnSEY19Gi8zSFVc",
      authDomain: "angular-course-project-b3e67.firebaseapp.com"
    });
  }


}
