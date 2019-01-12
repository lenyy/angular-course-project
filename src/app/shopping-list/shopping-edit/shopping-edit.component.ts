import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Ingredient} from '../../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list.service';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-shopping-edit',
    templateUrl: './shopping-edit.component.html',
    styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
    @ViewChild('f') form: NgForm;
    subscription: Subscription;
    editMode = false;
    editItemIndex: number;
    editedItem: Ingredient;

    constructor(private shoppingListService: ShoppingListService) { }

    ngOnInit() {
        this.subscription = this.shoppingListService.startedEditing.subscribe(
            (index: number) => {
                this.editMode = true;
                this.editItemIndex = index;
                this.editedItem = this.shoppingListService.getIngredient(index);
                this.form.setValue({
                    name: this.editedItem.name,
                    amount: this.editedItem.amount
                });
            }
        );
    }

    onSubmit(form: NgForm) {
        const value = form.value;
        const ingredient = new Ingredient(value.name, value.amount);
        if (this.editMode) {
            this.shoppingListService.updateIngredient(this.editItemIndex, ingredient);
        } else {
            this.shoppingListService.addIngredient(ingredient);
        }
        this.editMode = false;
        form.reset();
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    onReset() {
        this.form.reset();
        this.editMode = false;
    }

    onDelete() {
        this.shoppingListService.removeIngredient(this.editItemIndex);
        this.onReset();
    }

}
