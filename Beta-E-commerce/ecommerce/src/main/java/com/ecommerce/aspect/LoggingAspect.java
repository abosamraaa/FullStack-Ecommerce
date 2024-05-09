package com.ecommerce.aspect;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.stereotype.Component;

import java.util.logging.Logger;

@Aspect
@Component
public class LoggingAspect {
    private final Logger myLogger=Logger.getLogger(getClass().getName());

    //setup pointcut for controller
    @Pointcut("execution(* com.ecommerce.controller.*.*(..))")
    private void forControllerPackage(){}

    //setup pointcut for services

    @Pointcut("execution(* com.ecommerce.service.*.*(..))")
    private void forServicePackage(){}

    //setup pointcut for DAO
    @Pointcut("execution(* com.ecommerce.dao.*.*(..))")
    private void forDaoPackage(){}

    @Pointcut("forControllerPackage() || forServicePackage() || forDaoPackage()")
    private void forAppFlow(){}

    //add before advice
    @Before("forAppFlow()")
    public void before(JoinPoint theJoinPoint){
        // display method we are calling
        String theMethod =theJoinPoint.getSignature().toShortString();
        myLogger.info("=====>> in @Before: calling method: "+theMethod);

        //display the arguments to the methods

        //get the arguments
        Object[] args =theJoinPoint.getArgs();

        //loop throw and display args

        for (Object tempArg : args) {
            myLogger.info("======>> arguments: "+tempArg);
        }
    }

    //add @AfterReturning advice
    @AfterReturning(
            pointcut = "forAppFlow()",
            returning = "theResult"
    )
    public void afterReturning(JoinPoint theJoinPoint,Object theResult){
        //display method we are returning from
        String theMethod =theJoinPoint.getSignature().toShortString();
        myLogger.info("=====>> in @AfterReturning: from method: "+theMethod);

        //display data returned
        myLogger.info("======>>result: "+theResult);
    }

}
