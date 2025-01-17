package com.HIPAA.SeniorProject.Controller;

import com.HIPAA.SeniorProject.Service.CartService;
import com.HIPAA.SeniorProject.Service.InventoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
/** Handles Request from Client, RESTful web service, creates JSON/XML response body */
@RequestMapping(path = "api/cart")
public class CartController {

    private final CartService cartService;

    @Autowired
    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

   @PostMapping("/addItem")
    public void addItem(@RequestParam String product_name, String cart_cookie) {
        cartService.addItem(product_name, cart_cookie);
   }

}
