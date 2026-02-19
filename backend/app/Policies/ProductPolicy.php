<?php

namespace App\Policies;

use App\Models\Product;
use App\Models\User;

class ProductPolicy
{
    /**
     * Create a new policy instance.
     */
    public function __construct()
    {
        //
    }

    function delete(User $user, Product $product): bool
    {
        return $user->isAdministrator();
    }
}
