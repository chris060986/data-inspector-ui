import { Component, OnInit } from "@angular/core";
import { FormArray, FormControl, FormGroup } from "@angular/forms";
import { MAT_CHECKBOX_CLICK_ACTION } from "@angular/material";

@Component({
  selector: "diu-dynamic-form",
  templateUrl: "./dynamic-form.component.html",
  styleUrls: ["./dynamic-form.component.css"],
  providers: [{ provide: MAT_CHECKBOX_CLICK_ACTION, useValue: "check" }]
})
export class DynamicFormComponent implements OnInit {
  jsonSchema = {
    $schema: "http://json-schema.org/draft-04/schema#",
    type: "object",
    title: "COMPUTER-Schema",
    properties: {
      processor: {
        type: "string"
      },
      storage: {
        type: "array",
        items: [
          {
            type: "object",
            properties: {
              type: {
                type: "string"
              },
              memory: {
                type: "integer"
              }
            },
            required: ["type", "memory"]
          },
          {
            type: "object",
            properties: {
              type: {
                type: "string"
              },
              memory: {
                type: "integer"
              }
            },
            required: ["type", "memory"]
          }
        ]
      },
      ram: {
        type: "integer"
      },
      cooler: {
        type: "object",
        properties: {
          name: {
            type: "string"
          },
          speed: {
            type: "integer"
          }
        }
      }
    },
    required: ["processor", "storage", "ram", "cooler"]
  };

  jsonValues = {
    processor: "i7 7500U",
    storage: [
      {
        type: "HDD",
        memory: 1024
      },
      {
        type: "SSD",
        memory: 512
      }
    ],
    ram: 8,
    cooler: {
      name: "Aplenfön",
      speed: 1500
    }
  };

  private topLevelForm: FormGroup;
  private title: String;
  private schemaVersion: String;
  private structureObject: Object;
  private dataObject: Object;
  private requiredFields: Array<String>;

  constructor() {}

  ngOnInit() {
    this.topLevelForm = new FormGroup({});
    this.title = this.jsonSchema.title;
    this.schemaVersion = this.jsonSchema.$schema;
    this.structureObject = this.jsonSchema.properties;
    this.requiredFields = this.jsonSchema.required;
    this.dataObject = this.jsonValues;
  }

  onSubmit() {
    console.log(this.topLevelForm.value);
  }

  onNewHobby() {
    (<FormArray>this.topLevelForm.get("hobbies")).push(new FormControl(""));
  }
}
