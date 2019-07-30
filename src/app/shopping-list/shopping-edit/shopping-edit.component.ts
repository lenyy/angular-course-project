import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Ingredient} from '../../shared/ingredient.model';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs';
import {Store} from '@ngrx/store';
import * as ShoppingListActions from '../store/shopping-list.actions';
import {DeleteIngredient, StopEdit, UpdateIngredient} from '../store/shopping-list.actions';
import * as fromApp from '../../store/app.reducer';

@Component({
    selector: 'app-shopping-edit',
    templateUrl: './shopping-edit.component.html',
    styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
    @ViewChild('f') form: NgForm;
    subscription: Subscription;
    editMode = false;
    editedItem: Ingredient;

    constructor(private store: Store<fromApp.AppState>) { }

    ngOnInit() {
        this.subscription = this.store.select('shoppingList')
            .subscribe(
                data => {
                    if (data.editedIngredientIndex > -1) {
                        this.editedItem = data.editedIngredient;
                        this.editMode = true;
                        this.form.setValue({
                            name: this.editedItem.name,
                            amount: this.editedItem.amount
                        });
                    } else {
                        this.editMode = false;
                    }
                }
            );
    }

    onSubmit(form: NgForm) {
        const value = form.value;
        const ingredient = new Ingredient(value.name, value.amount);
        if (this.editMode) {
            this.store.dispatch(new UpdateIngredient({ingredient: ingredient}));
        } else {
            this.store.dispatch(new ShoppingListActions.AddIngredient(ingredient));
        }
        this.editMode = false;
        form.reset();
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
        this.store.dispatch(new StopEdit());
    }

    onReset() {
        this.form.reset();
        this.editMode = false;
    }

    onDelete() {
        this.store.dispatch(new DeleteIngredient());
        this.onReset();
    }

}
