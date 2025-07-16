// src/forms/CategoryForm.tsx

import React, { useState, useImperativeHandle, forwardRef } from "react";
import { TextInput, TextArea, Select } from "../components";
import { NAME_BASIC_REGEX } from '../constants/regex';

interface Item {
  name: string;
  description: string;
  technician: string;
}

export interface CategoryFormHandle {
    getPayload: () => { name: string; description: string; technician: string } | null;
}

interface CategoryFormProps {
  initialData?: Item;
}


const CategoryForm = forwardRef<CategoryFormHandle,  CategoryFormProps>(({ initialData },ref) => {

    interface FormData {
        name: string;
        description: string;
        technician: string;

    }

    interface FormErrors {
        name: string;
        description: string;
        technician: string;

    }

    const [formData, setFormData] = useState<FormData>({
    name: initialData?.name || "",
    description: initialData?.description || "",
    technician: initialData?.technician || ""
  });

    const [errors, setErrors] = useState<FormErrors>({
        name: '',
        description: '',
        technician: ''
    });

    const validateForm = () => {
        const newErrors: FormErrors = {
            name: '',
            description: '',
            technician: ''

        };

        let isValid = true;

        if (!formData.name || formData.name.length < 3) {
            newErrors.name = 'Name must be at least 3 characters.';
            isValid = false;
        }
        else if (!NAME_BASIC_REGEX.test(formData.name.replace(/\s/g, ''))) {
            newErrors.name = 'Name must contain only letters (no numbers or special characters).';
            isValid = false;
        }

        if (!formData.description || formData.description.length < 3) {
            newErrors.name = 'Description must be at least 15 characters.';
            isValid = false;
        }
        else if (!NAME_BASIC_REGEX.test(formData.description.replace(/\s/g, ''))) {
            newErrors.name = 'Description must contain only letters (no numbers or special characters).';
            isValid = false;
        }



        setErrors(newErrors);
        return isValid;
    };


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | { target: { name: string; value: any } }) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };


    useImperativeHandle(ref, () => ({
        getPayload: () => {
            if (!validateForm()) return null;
            return {
                name: formData.name,
                description: formData.description,
                technician: formData.technician
            };
        },
    }));


    const techniciansOptions = ['Amit', 'Akash', 'Vaibhav', 'Dinesh', 'Nikhil', 'Abhijeet'];

    return (

        <>
            <TextInput
                label="Name"
                required={true}
                value={formData.name}
                onChange={handleChange}
                name="name"
                minimum_length={5}
                maximum_length={100}
                error={errors.name}
            />


            <TextArea
                label="Description"
                name="description"
                required={true}
                minimum_length={50}
                maximum_length={5000}
                regex="^[A-Za-z0-9\s,.-]+$"
                type="text"
                value={formData.description}
                onChange={handleChange}
                rows={2}
                placeholder="Enter your description here..."
            />

            <Select
                label="Assign to Technician"
                name="technician"
                required={false}
                disabled={false}
                options={techniciansOptions}
                value={formData.technician}
                onChange={handleChange}
                placeholder="Select Assign to Technician"
            />
        </>

    );
});

export default CategoryForm;
