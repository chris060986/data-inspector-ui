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
      isWorking: {
        type: "boolean"
      },
      processor: {
        type: "string",
        enum: [
          "i7 7200",
          "i5 7200"
        ]
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
          },
          {
            type: "string"
          }
        ]
      },
      ram: {
        type: "number"
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
    isWorking: true,
    processor: "i7 7200",
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
    ram: 8.1,
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
    console.log("Form Values:", this.topLevelForm.value);
  }

  onNewHobby() {
    (<FormArray>this.topLevelForm.get("hobbies")).push(new FormControl(""));
  }
}
